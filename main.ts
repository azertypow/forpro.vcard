import { decode as base64Decode } from 'https://deno.land/std@0.82.0/encoding/base64.ts';
import { Base64 } from "https://deno.land/x/bb64/mod.ts";
import {qrcode} from "@libs/qrcode";



const [firstName, lastName, org, email, phone] = Deno.args

if (!firstName || !lastName || !org || !email || !phone) {
    console.error("Usage: deno run --allow-write createVCard.ts <firstName> <lastName> <org> <email> <phone>")
    Deno.exit(1)
}

const encoder = new TextEncoder()

// vCard
const vCard = `
BEGIN:VCARD
VERSION:3.0
FN;CHARSET=UTF-8:${firstName};${lastName}
N;CHARSET=UTF-8:${lastName};${firstName}
EMAIL;CHARSET=UTF-8;type=WORK,INTERNET:${email}
TEL;TYPE=WORK,VOICE:${phone}
ORG;CHARSET=UTF-8:${org}
REV:${new Date().toISOString()}
END:VCARD`

const fileName = `${firstName.toLowerCase()}.vcf`
const dataVCard = encoder.encode(vCard)
Deno.writeFile(fileName, dataVCard).then(() => {
    console.info(`VCard created: ${fileName}`)
})

//qQRCode
const svg = qrcode(vCard, { output: "svg" })
const qrCodeFileName = `${firstName.toLowerCase()}_qrcode.svg`
const dataSvg = encoder.encode(svg)

Deno.writeFile(qrCodeFileName, dataSvg).then(() => {
    console.info(`QR code (SVG) created: ${qrCodeFileName}`)
})
