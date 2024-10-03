import { qrcode } from "https://deno.land/x/qrcode/mod.ts"
import { decode as base64Decode } from 'https://deno.land/std@0.82.0/encoding/base64.ts';

import { Base64 } from "https://deno.land/x/bb64/mod.ts";



const [firstName, lastName, org, email, phone] = Deno.args

if (!firstName || !lastName || !org || !email || !phone) {
    console.error("Usage: deno run --allow-write createVCard.ts <firstName> <lastName> <org> <email> <phone>")
    Deno.exit(1)
}

const vCard = `
BEGIN:VCARD
VERSION:3.0
FN;CHARSET=UTF-8:${firstName}
N;CHARSET=UTF-8:;${firstName};;${lastName};
EMAIL;CHARSET=UTF-8;type=WORK,INTERNET:${email}
TEL;TYPE=WORK,VOICE:${phone}
ORG;CHARSET=UTF-8:${org}
REV:${new Date().toISOString()}
END:VCARD`

const fileName = `${firstName.toLowerCase()}.vcf`
Deno.writeTextFileSync(fileName, vCard)
console.log(`VCard created: ${fileName}`)


const qrCodeSVG = (await qrcode(vCard)).split(';base64,').pop()

const decodedImage = base64Decode(b64EncodeUnicode(qrCodeSVG));

const qrCodeFileName = `${firstName.toLowerCase()}_qrcode.gif`
Base64.fromBase64Uint8Array(decodedImage).toFile(qrCodeFileName)
console.log(`QR code (SVG) created: ${qrCodeFileName}`)


// Encoding UTF-8 ⇢ base64

function b64EncodeUnicode(str: string) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode(parseInt(p1, 16))
    }))
}
