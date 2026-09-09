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

    // Email HTML Content
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
          <p><strong>Lieu du projet (Fokontany & Région) :</strong> ${location}</p>
          <p><strong>Surface du terrain :</strong> ${landSurface} m²</p>
          <p><strong>Type de construction :</strong> <span style="background-color: #C8962C; color: #fff; padding: 2px 8px; border-radius: 4px; font-weight: bold;">${buildingType}</span></p>

          ${
            buildingType === "Villa d'habitation"
              ? `
            <div style="background-color: #F4F6F8; padding: 15px; border-radius: 6px; margin-top: 10px;">
              <p style="margin: 5px 0;"><strong>Nombre de chambres :</strong> ${villaBedrooms || 'Non spécifié'}</p>
              <p style="margin: 5px 0;"><strong>Nombre d'étages :</strong> ${villaFloors || 'Non spécifié'}</p>
            </div>
            `
              : `
            <div style="background-color: #F4F6F8; padding: 15px; border-radius: 6px; margin-top: 10px;">
              <p style="margin: 5px 0;"><strong>Détails des appartements & chambres :</strong> ${apartmentDetails || 'Non spécifié'}</p>
              <p style="margin: 5px 0;"><strong>Niveau d'étages (R + X) :</strong> ${buildingFloors || 'Non spécifié'}</p>
            </div>
            `
          }

          ${
            message
              ? `
            <h3 style="color: #0F3A4D; border-bottom: 2px solid #C8962C; padding-bottom: 8px; margin-top: 25px;">Remarques / Message complémentaire</h3>
            <p style="white-space: pre-line; background-color: #fafafa; padding: 12px; border-left: 4px solid #0F3A4D;">${message}</p>
            `
              : ''
          }
        </div>
        <div style="background-color: #F4F6F8; padding: 15px; text-align: center; font-size: 12px; color: #777; border-top: 1px solid #e0e0e0;">
          Formulaire envoyé depuis le site MPANORINA NOFY.
        </div>
      </div>
    `;

    // Attempt SMTP Send if configured, or console output + success
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
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
        from: `"MPANORINA NOFY Site" <${process.env.SMTP_USER}>`,
        to: recipientEmail,
        subject: `[Devis] ${buildingType} - ${name} (${location})`,
        html: htmlContent,
      });
    } else {
      console.log(`[CONTACT FORM SUBMISSION] Sent to ${recipientEmail}:`, body);
    }

    return NextResponse.json({
      success: true,
      message: 'Votre demande a été envoyée avec succès.',
    });
  } catch (error) {
    console.error('Error handling contact form submission:', error);
    return NextResponse.json(
      { success: false, error: 'Une erreur est survenue lors de l\'envoi.' },
      { status: 500 }
    );
  }
}
