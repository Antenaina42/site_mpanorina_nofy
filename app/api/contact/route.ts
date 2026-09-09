import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      phone,
      email,
      location,
      landSurface,
      buildingType,
      villaBedrooms,
      villaFloors,
      apartmentDetails,
      buildingFloors,
      message,
    } = body;

    if (!name || !phone || !email || !location || !landSurface || !buildingType) {
      return NextResponse.json(
        { success: false, error: 'Champs obligatoires manquants' },
        { status: 400 }
      );
    }

    const recipientEmail = process.env.CONTACT_EMAIL || 'razakatiana.antenaina@yahoo.com';

    // 1. If SMTP environment variables exist, send via Nodemailer SMTP
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      const htmlContent = `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #0F3A4D; color: #ffffff; padding: 20px; text-align: center;">
            <h2 style="margin: 0; font-size: 20px;">Nouvelle Demande de Devis - MPANORINA NOFY</h2>
            <p style="margin: 5px 0 0 0; color: #C8962C; font-size: 13px; text-transform: uppercase;">Bâtiment & Gros Œuvre</p>
          </div>
          <div style="padding: 25px;">
            <h3 style="color: #0F3A4D; border-bottom: 2px solid #C8962C; padding-bottom: 8px; margin-top: 0;">Coordonnées du Client</h3>
            <p><strong>Nom complet :</strong> ${name}</p>
            <p><strong>Téléphone :</strong> ${phone}</p>
            <p><strong>Email :</strong> ${email}</p>

            <h3 style="color: #0F3A4D; border-bottom: 2px solid #C8962C; padding-bottom: 8px; margin-top: 25px;">Détails du Projet</h3>
            <p><strong>Lieu du projet :</strong> ${location}</p>
            <p><strong>Surface du terrain :</strong> ${landSurface} m²</p>
            <p><strong>Type de construction :</strong> ${buildingType}</p>
            ${
              buildingType === "Villa d'habitation"
                ? `<p><strong>Nombre de chambres :</strong> ${villaBedrooms}</p><p><strong>Nombre d'étages :</strong> ${villaFloors}</p>`
                : `<p><strong>Appartements & chambres :</strong> ${apartmentDetails}</p><p><strong>Niveau d'étages :</strong> ${buildingFloors}</p>`
            }
            ${message ? `<p><strong>Remarques :</strong> ${message}</p>` : ''}
          </div>
        </div>
      `;

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Boolean(process.env.SMTP_SECURE === 'true'),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"MPANORINA NOFY" <${process.env.SMTP_USER}>`,
        to: recipientEmail,
        subject: `[Devis MPANORINA NOFY] ${buildingType} - ${name} (${location})`,
        html: htmlContent,
      });

      return NextResponse.json({ success: true });
    }

    // 2. Relay via FormSubmit with explicit browser origin & referer headers
    const formSubmitPayload = {
      _subject: `[Devis MPANORINA NOFY] ${buildingType} - ${name} (${location})`,
      _replyto: email,
      _template: 'table',
      _captcha: 'false',
      "Nom complet": name,
      "Telephone": phone,
      "Email client": email,
      "Lieu du projet": location,
      "Surface du terrain": `${landSurface} m2`,
      "Type de construction": buildingType,
      ...(buildingType === "Villa d'habitation"
        ? {
            "Nombre de chambres": villaBedrooms || 'Non specifie',
            "Nombre d etages": villaFloors || 'Non specifie',
          }
        : {
            "Details appartements et chambres": apartmentDetails || 'Non specifie',
            "Niveau d etages (R + X)": buildingFloors || 'Non specifie',
          }),
      "Remarques / Message": message || 'Aucune remarque',
    };

    const fsResponse = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'https://mpanorina-nofy.com',
        'Referer': 'https://mpanorina-nofy.com/contact',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      body: JSON.stringify(formSubmitPayload),
    });

    const fsData = await fsResponse.json();
    console.log('[FormSubmit API Response]:', fsData);

    const isPendingActivation =
      fsData?.message && fsData.message.toLowerCase().includes('activation');

    return NextResponse.json({
      success: true,
      message: isPendingActivation
        ? 'Un email d\'activation a été envoyé à ' + recipientEmail + '. Veuillez cliquer sur "Activate Form" dans votre boîte mail pour autoriser la réception immédiate des formulaires.'
        : 'Votre demande a été envoyée avec succès.',
      isPendingActivation,
    });
  } catch (error) {
    console.error('Error handling contact form submission:', error);
    return NextResponse.json(
      { success: false, error: 'Une erreur est survenue lors de l\'envoi.' },
      { status: 500 }
    );
  }
}
