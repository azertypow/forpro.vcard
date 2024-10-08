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
await Bun.write(fileName, vCard)
console.log(`VCard created: ${fileName}`)

// Génération du QR code à partir de la VCard
const qrCodeSVG = await qrcode(vCard,  {output: "svg"})

// Enregistrement du QR code au format SVG
const qrCodeFileName = `${firstName.toLowerCase()}_qrcode.svg`
await Bun.write(qrCodeFileName, qrCodeSVG)
console.log(`QR code (SVG) created: ${qrCodeFileName}`)
