import {qrcode} from "@libs/qrcode"

const [firstName, lastName, org, email, phone] = process.argv.slice(2)

if (!firstName || !lastName || !org || !email || !phone) {
    console.error("Usage: bun run createVCard.js <firstName> <lastName> <org> <email> <phone>")
    process.exit(1)
}

// Génération de la VCard
const vCard = `
BEGIN:VCARD
VERSION:3.0
FN;CHARSET=UTF-8:${firstName}
N;CHARSET=UTF-8:;${firstName};;${lastName};
EMAIL;CHARSET=UTF-8;type=WORK,INTERNET:${email}
TEL;TYPE=WORK,VOICE:${phone}
ORG;CHARSET=UTF-8:${org}
REV:${new Date().toISOString()}
END:VCARD`;

// Enregistrement du fichier VCard
const fileName = `${firstName.toLowerCase()}.vcf`
Bun.write(fileName, vCard).then(() => console.info(`VCard created: ${fileName}`))


// Génération du QR code à partir de la VCard
const qrCodeSVG = qrcode(vCard,  {
    output: 'svg',
    dark: 'rgb(23, 84, 255)',
    ecl: 'HIGH',
    border: 0,
})

// Enregistrement du QR code au format SVG
const qrCodeFileName = `${firstName.toLowerCase()}_qrcode.svg`
Bun.write(qrCodeFileName, qrCodeSVG).then(() => console.info(`QR code (SVG) created: ${qrCodeFileName}`))
