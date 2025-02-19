// Função para dividir a string Base64 e decodificar partes dela
function base64DecodeLarge(str) {
    const chunkSize = 1024 * 1024; // Tamanho do chunk (ajuste conforme necessário)
    let decoded = '';

    for (let i = 0; i < str.length; i += chunkSize) {
        let chunk = str.slice(i, i + chunkSize);
        decoded += atob(chunk);
    }

    try {
        return decodeURIComponent(escape(decoded));  // Isso pode ser desnecessário dependendo do tipo de dado
    } catch (e) {
        console.error("Erro ao decodificar a string: ", e);
        return decoded;
    }
}

// Substitua esta string pelo seu código BASE64
const base64String = "eyJldmVudCI6eyJfaWQiOiI2N2I1YTc2NmJiZTI3YmY0NzJiYTY0OGIiLCJtYXhfeHAiOjk2NTUwMDAsIm1heF9tdWx0aXBsaWVyIjoxMDAwMCwibWF4X2xldmVsIjoyMCwicHJvZ3Jlc3Npb25fZXZlbnRfdHlwZSI6ImRlZmF1bHQiLCJlbmRfZGF0ZSI6IjIwMjUtMDItMjFUMTU6MDA6MDAuMDAwWiIsImxhc3RfdXBkYXRlZCI6MTczOTk1ODExODExMiwiZGVzY3JpcHRpb24iOnsiZW4iOiJbMTnigJMyMSBGZWJdIFN0ZWxsYXIgT21lbiDigJQgUHJvZ3Jlc3Npb24gRXZlbnQiLCJjbiI6IlsxOeKAkzIxIEZlYl0gU3RlbGxhciBPbWVuIOKAlCBQcm9ncmVzc2lvbiBFdmVudCJ9LCJ0aXRsZSI6eyJlbiI6IlN0ZWxsYXIgT21lbiIsImNuIjoiU3RlbGxhciBPbWVuIn19LCJyZXdhcmRzIjpbeyJpZCI6IjY3YjVhNzY2YTI2YzM3YzMwZjM1YTgwNyIsIml0ZW1faWQiOm51bGwsImFtb3VudCI6MTUwMDAwLCJjdXJyZW5jeSI6IlJMVCIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MSwidHlwZSI6Im1vbmV5IiwidGl0bGUiOnsiZW4iOiJNb25leSBUaXRsZSIsImNuIjoiTW9uZXkgVGl0bGUifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNb25leSBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1vbmV5IFJld2FyZCBEZXNjcmlwdGlvbiJ9fSx7ImlkIjoiNjdiNWE3NjZhMjZjMzdjMzBmMzVhODBiIiwiaXRlbV9pZCI6IjY1MDA0MjE2MjIxNmUxODQxZWJhODQ4YiIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjIsInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjY1MDA0MjE2MjIxNmUxODQxZWJhODQ4YiIsInBvd2VyIjozMzA3NSwid2lkdGgiOjEsIm5hbWUiOnsiZW4iOiJHUFViaXQiLCJjbiI6IkdQVWJpdCIsImVzIjoiR1BVYml0IiwicHQiOiJHUFViaXQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJDcnlwdG8gbWluaW5nIGRldmljZSwgbGVhZHMgdGhlIHdheSB3aXRoIHVubWF0Y2hlZCBlZmZpY2llbmN5IGFuZCBza2lsbCwgaGFybmVzc2luZyBjdXR0aW5nLWVkZ2UgR1BVcyBmb3IgZGlnaXRhbCBnb2xkLiIsImNuIjoiQ3J5cHRvIG1pbmluZyBkZXZpY2UsIGxlYWRzIHRoZSB3YXkgd2l0aCB1bm1hdGNoZWQgZWZmaWNpZW5jeSBhbmQgc2tpbGwsIGhhcm5lc3NpbmcgY3V0dGluZy1lZGdlIEdQVXMgZm9yIGRpZ2l0YWwgZ29sZC4iLCJlcyI6IkNyeXB0byBtaW5pbmcgZGV2aWNlLCBsZWFkcyB0aGUgd2F5IHdpdGggdW5tYXRjaGVkIGVmZmljaWVuY3kgYW5kIHNraWxsLCBoYXJuZXNzaW5nIGN1dHRpbmctZWRnZSBHUFVzIGZvciBkaWdpdGFsIGdvbGQuIiwicHQiOiJDcnlwdG8gbWluaW5nIGRldmljZSwgbGVhZHMgdGhlIHdheSB3aXRoIHVubWF0Y2hlZCBlZmZpY2llbmN5IGFuZCBza2lsbCwgaGFybmVzc2luZyBjdXR0aW5nLWVkZ2UgR1BVcyBmb3IgZGlnaXRhbCBnb2xkLiJ9LCJjcmVhdGVkX2J5X3RpdGxlIjp7ImxpbmsiOiIiLCJ0ZXh0IjoiIn0sImxldmVsIjoyLCJ0eXBlIjoibWVyZ2UiLCJmaWxlbmFtZSI6ImdwdWJpdCIsImlzX2Nhbl9iZV9zb2xkX29uX21wIjpmYWxzZSwiYm9udXMiOjIwLCJpc19pbl9zZXQiOmZhbHNlfX0seyJpZCI6IjY3YjVhNzY2YTI2YzM3YzMwZjM1YTgwZiIsIml0ZW1faWQiOm51bGwsImFtb3VudCI6NTAwMDAwMCwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6NjA0ODAwMDAwLCJyZXF1aXJlZF9sZXZlbCI6MywidHlwZSI6InBvd2VyIiwidGl0bGUiOnsiZW4iOiJQb3dlciIsImNuIjoiUG93ZXIifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJQb3dlciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6IlBvd2VyIFJld2FyZCBEZXNjcmlwdGlvbiJ9fSx7ImlkIjoiNjdiNWE3NjZhMjZjMzdjMzBmMzVhODEzIiwiaXRlbV9pZCI6bnVsbCwiYW1vdW50Ijo1MCwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjQsInR5cGUiOiJzZWFzb25fcGFzc194cCIsInRpdGxlIjp7ImVuIjoiU2Vhc29uIFBhc3MgWFAiLCJjbiI6IlNlYXNvbiBQYXNzIFhQIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiU2Vhc29uIFBhc3MgWFAgRGVzY3JpcHRpb24iLCJjbiI6IlNlYXNvbiBQYXNzIFhQIERlc2NyaXB0aW9uIn19LHsiaWQiOiI2N2I1YTc2NmEyNmMzN2MzMGYzNWE4MTgiLCJpdGVtX2lkIjoiNjUwMDQyMTYyMjE2ZTE4NDFlYmE4NDkzIiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6NSwidHlwZSI6Im1pbmVyIiwidGl0bGUiOnsiZW4iOiJNaW5lciBSZXdhcmQiLCJjbiI6Ik1pbmVyIFJld2FyZCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIn0sIml0ZW0iOnsiX2lkIjoiNjUwMDQyMTYyMjE2ZTE4NDFlYmE4NDkzIiwicG93ZXIiOjg2ODM1LCJ3aWR0aCI6MSwibmFtZSI6eyJlbiI6IkdQVWJpdCIsImNuIjoiR1BVYml0IiwiZXMiOiJHUFViaXQiLCJwdCI6IkdQVWJpdCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6IkNyeXB0byBtaW5pbmcgZGV2aWNlLCBsZWFkcyB0aGUgd2F5IHdpdGggdW5tYXRjaGVkIGVmZmljaWVuY3kgYW5kIHNraWxsLCBoYXJuZXNzaW5nIGN1dHRpbmctZWRnZSBHUFVzIGZvciBkaWdpdGFsIGdvbGQuIiwiY24iOiJDcnlwdG8gbWluaW5nIGRldmljZSwgbGVhZHMgdGhlIHdheSB3aXRoIHVubWF0Y2hlZCBlZmZpY2llbmN5IGFuZCBza2lsbCwgaGFybmVzc2luZyBjdXR0aW5nLWVkZ2UgR1BVcyBmb3IgZGlnaXRhbCBnb2xkLiIsImVzIjoiQ3J5cHRvIG1pbmluZyBkZXZpY2UsIGxlYWRzIHRoZSB3YXkgd2l0aCB1bm1hdGNoZWQgZWZmaWNpZW5jeSBhbmQgc2tpbGwsIGhhcm5lc3NpbmcgY3V0dGluZy1lZGdlIEdQVXMgZm9yIGRpZ2l0YWwgZ29sZC4iLCJwdCI6IkNyeXB0byBtaW5pbmcgZGV2aWNlLCBsZWFkcyB0aGUgd2F5IHdpdGggdW5tYXRjaGVkIGVmZmljaWVuY3kgYW5kIHNraWxsLCBoYXJuZXNzaW5nIGN1dHRpbmctZWRnZSBHUFVzIGZvciBkaWdpdGFsIGdvbGQuIn0sImNyZWF0ZWRfYnlfdGl0bGUiOnsibGluayI6IiIsInRleHQiOiIifSwibGV2ZWwiOjMsInR5cGUiOiJtZXJnZSIsImZpbGVuYW1lIjoiZ3B1Yml0IiwiaXNfY2FuX2JlX3NvbGRfb25fbXAiOmZhbHNlLCJib251cyI6NDEsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjdiNWE3NjZhMjZjMzdjMzBmMzVhODFjIiwiaXRlbV9pZCI6IjY1MDA0Mzg2MjIxNmUxODQxZWJhODU0MiIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjYsInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjY1MDA0Mzg2MjIxNmUxODQxZWJhODU0MiIsInBvd2VyIjoxMDg2NzUsIndpZHRoIjoxLCJuYW1lIjp7ImVuIjoiQml0QWNlIiwiY24iOiJCaXRBY2UiLCJlcyI6IkJpdEFjZSIsInB0IjoiQml0QWNlIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiWW91ciBjcnlwdG8gbWluaW5nIGFjZSIsImNuIjoiWW91ciBjcnlwdG8gbWluaW5nIGFjZSIsImVzIjoiWW91ciBjcnlwdG8gbWluaW5nIGFjZSIsInB0IjoiWW91ciBjcnlwdG8gbWluaW5nIGFjZSJ9LCJjcmVhdGVkX2J5X3RpdGxlIjp7ImxpbmsiOiIiLCJ0ZXh0IjoiIn0sImxldmVsIjozLCJ0eXBlIjoibWVyZ2UiLCJmaWxlbmFtZSI6ImJpdGFjZSIsImlzX2Nhbl9iZV9zb2xkX29uX21wIjpmYWxzZSwiYm9udXMiOjQxLCJpc19pbl9zZXQiOmZhbHNlfX0seyJpZCI6IjY3YjVhNzY2YTI2YzM3YzMwZjM1YTgyMCIsIml0ZW1faWQiOiI2NTAwNDM4NjIyMTZlMTg0MWViYTg1NGEiLCJhbW91bnQiOjEsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjo3LCJ0eXBlIjoibWluZXIiLCJ0aXRsZSI6eyJlbiI6Ik1pbmVyIFJld2FyZCIsImNuIjoiTWluZXIgUmV3YXJkIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24ifSwiaXRlbSI6eyJfaWQiOiI2NTAwNDM4NjIyMTZlMTg0MWViYTg1NGEiLCJwb3dlciI6Mjg1Mjg1LCJ3aWR0aCI6MSwibmFtZSI6eyJlbiI6IkJpdEFjZSIsImNuIjoiQml0QWNlIiwiZXMiOiJCaXRBY2UiLCJwdCI6IkJpdEFjZSJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6IllvdXIgY3J5cHRvIG1pbmluZyBhY2UiLCJjbiI6IllvdXIgY3J5cHRvIG1pbmluZyBhY2UiLCJlcyI6IllvdXIgY3J5cHRvIG1pbmluZyBhY2UiLCJwdCI6IllvdXIgY3J5cHRvIG1pbmluZyBhY2UifSwiY3JlYXRlZF9ieV90aXRsZSI6eyJsaW5rIjoiIiwidGV4dCI6IiJ9LCJsZXZlbCI6NCwidHlwZSI6Im1lcmdlIiwiZmlsZW5hbWUiOiJiaXRhY2UiLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6ZmFsc2UsImJvbnVzIjo2NSwiaXNfaW5fc2V0IjpmYWxzZX19LHsiaWQiOiI2N2I1YTc2NmEyNmMzN2MzMGYzNWE4MjQiLCJpdGVtX2lkIjoiNjExZTI5OTViZjZiNTM3NDRjYzhjZjYzIiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6OCwidHlwZSI6Im1pbmVyIiwidGl0bGUiOnsiZW4iOiJNaW5lciBSZXdhcmQiLCJjbiI6Ik1pbmVyIFJld2FyZCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIn0sIml0ZW0iOnsiX2lkIjoiNjExZTI5OTViZjZiNTM3NDRjYzhjZjYzIiwicG93ZXIiOjIxMDAwMCwid2lkdGgiOjIsIm5hbWUiOnsiZW4iOiJTdGFyZ3JvdW5kIiwiY24iOiJTdGFyZ3JvdW5kIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiVGhpcyBzcGFjZSBleHBsb3JlciB3aWxsIGdldCB5b3UgdG8gdGhlIE1vb24hIiwiY24iOiLov5nlsIbluKbmgqjnmbvkuIrmnIjnkIPvvIEifSwibGV2ZWwiOjAsInR5cGUiOiJiYXNpYyIsImZpbGVuYW1lIjoic3Rhcmdyb3VuZCIsImlzX2Nhbl9iZV9zb2xkX29uX21wIjp0cnVlLCJib251cyI6MzAwLCJpc19pbl9zZXQiOmZhbHNlfX0seyJpZCI6IjY3YjVhNzY2YTI2YzM3YzMwZjM1YTgyOCIsIml0ZW1faWQiOm51bGwsImFtb3VudCI6MjAwMDAwMDAwLCJjdXJyZW5jeSI6IlJTVCIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6OSwidHlwZSI6Im1vbmV5IiwidGl0bGUiOnsiZW4iOiJNb25leSBUaXRsZSIsImNuIjoiTW9uZXkgVGl0bGUifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNb25leSBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1vbmV5IFJld2FyZCBEZXNjcmlwdGlvbiJ9fSx7ImlkIjoiNjdiNWE3NjZhMjZjMzdjMzBmMzVhODJjIiwiaXRlbV9pZCI6IjYzMWY3OGEzODIzOGVkMjgzYTIzMzE5ZiIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjEwLCJ0eXBlIjoibWluZXIiLCJ0aXRsZSI6eyJlbiI6Ik1pbmVyIFJld2FyZCIsImNuIjoiTWluZXIgUmV3YXJkIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24ifSwiaXRlbSI6eyJfaWQiOiI2MzFmNzhhMzgyMzhlZDI4M2EyMzMxOWYiLCJwb3dlciI6MjYyNTAwLCJ3aWR0aCI6MiwibmFtZSI6eyJlbiI6Ik51Y2xldXMiLCJjbiI6Ik51Y2xldXMifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJKdXN0IHNlZSBob3cgaXQgZ2xpbnRzIGFuZCBzcGFya2xlcy4gVGhlIHB1cmUgYmVhdXR5ISIsImNuIjoiSnVzdCBzZWUgaG93IGl0IGdsaW50cyBhbmQgc3BhcmtsZXMuIFRoZSBwdXJlIGJlYXV0eSEifSwiY3JlYXRlZF9ieV90aXRsZSI6eyJsaW5rIjoiIiwidGV4dCI6IiJ9LCJsZXZlbCI6MSwidHlwZSI6Im1lcmdlIiwiZmlsZW5hbWUiOiJudWNsZXVzIiwiaXNfY2FuX2JlX3NvbGRfb25fbXAiOnRydWUsImJvbnVzIjoxNTgsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjdiNWE3NjZhMjZjMzdjMzBmMzVhODMwIiwiaXRlbV9pZCI6IjY1YmJhMTkyYTE5YzM5NGFhMzA5NjIzYiIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjExLCJ0eXBlIjoicmFjayIsInRpdGxlIjp7ImVuIjoiUmFjayBUaXRsZSIsImNuIjoiUmFjayBUaXRsZSJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6IlJhY2sgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJSYWNrIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Im5hbWUiOnsiZW4iOiJSZWQgU2lsayA4IiwiY24iOiJSZWQgU2lsayA4In0sImRlc2NyaXB0aW9uIjp7ImVuIjoiT25seSB0aGUgd2VhbHRoaWVzdCBjYW4gYWZmb3JkIGEgc2lsayBjb3ZlciBvbiB0aGVpciByYWNrcy4gQnV0IHRoZSA1JSBib251cyBpcyBhYm92ZSBhbGwgdGhlIGNvbnMhIiwiY24iOiJPbmx5IHRoZSB3ZWFsdGhpZXN0IGNhbiBhZmZvcmQgYSBzaWxrIGNvdmVyIG9uIHRoZWlyIHJhY2tzLiBCdXQgdGhlIDUlIGJvbnVzIGlzIGFib3ZlIGFsbCB0aGUgY29ucyEifSwiX2lkIjoiNjViYmExOTJhMTljMzk0YWEzMDk2MjNiIiwiY2FwYWNpdHkiOjgsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjdiNWE3NjZhMjZjMzdjMzBmMzVhODM0IiwiaXRlbV9pZCI6IjYxNTMyMTQ2ZGI1MDA4MTAyZjlmNzdlMiIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjEyLCJ0eXBlIjoibWluZXIiLCJ0aXRsZSI6eyJlbiI6Ik1pbmVyIFJld2FyZCIsImNuIjoiTWluZXIgUmV3YXJkIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24ifSwiaXRlbSI6eyJfaWQiOiI2MTUzMjE0NmRiNTAwODEwMmY5Zjc3ZTIiLCJuYW1lIjp7ImVuIjoiUGFyYWRveCIsImNuIjoiUGFyYWRveCIsImVzIjoiUGFyYWRveCIsInB0IjoiUGFyYWRveCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6IlRoZSBGZXJtaSBQYXJhZG94IHRlbGxzIHVzIHRoYXQgYWxpZW5zIChkbyBub3QpIGV4aXN0LiBCdXQgd2hlcmUgZWxzZSB3b3VsZCB5b3UgZ2V0IHRoaXMgY29zbWljIG1pbmVyPyBEYXJrIFN0YXIgU2VyaWVzIE1pbmVyLiIsImNuIjoiVGhlIEZlcm1pIFBhcmFkb3ggdGVsbHMgdXMgdGhhdCBhbGllbnMgKGRvIG5vdCkgZXhpc3QuIEJ1dCB3aGVyZSBlbHNlIHdvdWxkIHlvdSBnZXQgdGhpcyBjb3NtaWMgbWluZXI/IERhcmsgU3RhciBTZXJpZXMgTWluZXIuIiwiZXMiOiJUaGUgRmVybWkgUGFyYWRveCB0ZWxscyB1cyB0aGF0IGFsaWVucyAoZG8gbm90KSBleGlzdC4gQnV0IHdoZXJlIGVsc2Ugd291bGQgeW91IGdldCB0aGlzIGNvc21pYyBtaW5lcj8gRGFyayBTdGFyIFNlcmllcyBNaW5lci4iLCJwdCI6IlRoZSBGZXJtaSBQYXJhZG94IHRlbGxzIHVzIHRoYXQgYWxpZW5zIChkbyBub3QpIGV4aXN0LiBCdXQgd2hlcmUgZWxzZSB3b3VsZCB5b3UgZ2V0IHRoaXMgY29zbWljIG1pbmVyPyBEYXJrIFN0YXIgU2VyaWVzIE1pbmVyLiJ9LCJwb3dlciI6MzUwMDAwLCJ3aWR0aCI6MiwibGV2ZWwiOjAsInR5cGUiOiJiYXNpYyIsImZpbGVuYW1lIjoicGFyYWRveCIsImlzX2Nhbl9iZV9zb2xkX29uX21wIjpmYWxzZSwiY3JlYXRlZF9ieV90aXRsZSI6eyJsaW5rIjoiIiwidGV4dCI6IiJ9LCJib251cyI6MzAwLCJpc19pbl9zZXQiOmZhbHNlfX0seyJpZCI6IjY3YjVhNzY2YTI2YzM3YzMwZjM1YTgzOCIsIml0ZW1faWQiOiI2MzFmNzg1NjgyMzhlZDI4M2EyMzJlMTEiLCJhbW91bnQiOjEsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjoxMywidHlwZSI6Im1pbmVyIiwidGl0bGUiOnsiZW4iOiJNaW5lciBSZXdhcmQiLCJjbiI6Ik1pbmVyIFJld2FyZCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIn0sIml0ZW0iOnsiX2lkIjoiNjMxZjc4NTY4MjM4ZWQyODNhMjMyZTExIiwicG93ZXIiOjMyODEyNSwid2lkdGgiOjEsIm5hbWUiOnsiZW4iOiJQaG90b24iLCJjbiI6IlBob3RvbiIsImVzIjoiUGhvdG9uIiwicHQiOiJQaG90b24ifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJJcyBpdCBhIHBhcnRpY2xlIG9yIHdhdmU/IFRoZSBhbnN3ZXIgaXMg4oCTIG1pbmluZyBtYWNoaW5lISBEYXJrIFN0YXIgU2VyaWVzIE1pbmVyLiIsImNuIjoiSXMgaXQgYSBwYXJ0aWNsZSBvciB3YXZlPyBUaGUgYW5zd2VyIGlzIOKAkyBtaW5pbmcgbWFjaGluZSEgRGFyayBTdGFyIFNlcmllcyBNaW5lci4iLCJlcyI6IklzIGl0IGEgcGFydGljbGUgb3Igd2F2ZT8gVGhlIGFuc3dlciBpcyDigJMgbWluaW5nIG1hY2hpbmUhIERhcmsgU3RhciBTZXJpZXMgTWluZXIuIiwicHQiOiJJcyBpdCBhIHBhcnRpY2xlIG9yIHdhdmU/IFRoZSBhbnN3ZXIgaXMg4oCTIG1pbmluZyBtYWNoaW5lISBEYXJrIFN0YXIgU2VyaWVzIE1pbmVyLiJ9LCJjcmVhdGVkX2J5X3RpdGxlIjp7ImxpbmsiOiIiLCJ0ZXh0IjoiIn0sImxldmVsIjoxLCJ0eXBlIjoibWVyZ2UiLCJmaWxlbmFtZSI6InBob3RvbiIsImlzX2Nhbl9iZV9zb2xkX29uX21wIjpmYWxzZSwiYm9udXMiOjE1OCwiaXNfaW5fc2V0IjpmYWxzZX19LHsiaWQiOiI2N2I1YTc2NmEyNmMzN2MzMGYzNWE4M2MiLCJpdGVtX2lkIjoiNjE1MzIxNDZkYjUwMDgxMDJmOWY3N2UxIiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MTQsInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjYxNTMyMTQ2ZGI1MDA4MTAyZjlmNzdlMSIsIm5hbWUiOnsiZW4iOiJHcmF2aXR5IiwiY24iOiJHcmF2aXR5IiwiZXMiOiJHcmF2aXR5IiwicHQiOiJHcmF2aXR5In0sImRlc2NyaXB0aW9uIjp7ImVuIjoiVGhlIGZvcmNlIG9mIGF0dHJhY3Rpb24gYmV0d2VlbiB0aGlzIG1pbmluZyBtYWNoaW5lIGFuZCB5b3VyIGNyeXB0byByZXdhcmRzIGlzIGluZGVzdHJ1Y3RpYmxlLiBKdXN0IGxpa2UgZ3Jhdml0eSEgRGFyayBTdGFyIFNlcmllcyBNaW5lci4iLCJjbiI6IlRoZSBmb3JjZSBvZiBhdHRyYWN0aW9uIGJldHdlZW4gdGhpcyBtaW5pbmcgbWFjaGluZSBhbmQgeW91ciBjcnlwdG8gcmV3YXJkcyBpcyBpbmRlc3RydWN0aWJsZS4gSnVzdCBsaWtlIGdyYXZpdHkhIERhcmsgU3RhciBTZXJpZXMgTWluZXIuIiwiZXMiOiJUaGUgZm9yY2Ugb2YgYXR0cmFjdGlvbiBiZXR3ZWVuIHRoaXMgbWluaW5nIG1hY2hpbmUgYW5kIHlvdXIgY3J5cHRvIHJld2FyZHMgaXMgaW5kZXN0cnVjdGlibGUuIEp1c3QgbGlrZSBncmF2aXR5ISBEYXJrIFN0YXIgU2VyaWVzIE1pbmVyLiIsInB0IjoiVGhlIGZvcmNlIG9mIGF0dHJhY3Rpb24gYmV0d2VlbiB0aGlzIG1pbmluZyBtYWNoaW5lIGFuZCB5b3VyIGNyeXB0byByZXdhcmRzIGlzIGluZGVzdHJ1Y3RpYmxlLiBKdXN0IGxpa2UgZ3Jhdml0eSEgRGFyayBTdGFyIFNlcmllcyBNaW5lci4ifSwicG93ZXIiOjUwMDAwMCwid2lkdGgiOjIsImxldmVsIjowLCJ0eXBlIjoiYmFzaWMiLCJmaWxlbmFtZSI6ImdyYXZpdHkiLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6ZmFsc2UsImNyZWF0ZWRfYnlfdGl0bGUiOnsibGluayI6IiIsInRleHQiOiIifSwiYm9udXMiOjQwMCwiaXNfaW5fc2V0IjpmYWxzZX19LHsiaWQiOiI2N2I1YTc2NmEyNmMzN2MzMGYzNWE4NDAiLCJpdGVtX2lkIjpudWxsLCJhbW91bnQiOjQwMDAwMDAwMCwiY3VycmVuY3kiOiJSU1QiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjE1LCJ0eXBlIjoibW9uZXkiLCJ0aXRsZSI6eyJlbiI6Ik1vbmV5IFRpdGxlIiwiY24iOiJNb25leSBUaXRsZSJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6Ik1vbmV5IFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiTW9uZXkgUmV3YXJkIERlc2NyaXB0aW9uIn19LHsiaWQiOiI2N2I1YTc2NmEyNmMzN2MzMGYzNWE4NDQiLCJpdGVtX2lkIjpudWxsLCJhbW91bnQiOjEwMCwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjE2LCJ0eXBlIjoic2Vhc29uX3Bhc3NfeHAiLCJ0aXRsZSI6eyJlbiI6IlNlYXNvbiBQYXNzIFhQIiwiY24iOiJTZWFzb24gUGFzcyBYUCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6IlNlYXNvbiBQYXNzIFhQIERlc2NyaXB0aW9uIiwiY24iOiJTZWFzb24gUGFzcyBYUCBEZXNjcmlwdGlvbiJ9fSx7ImlkIjoiNjdiNWE3NjZhMjZjMzdjMzBmMzVhODQ4IiwiaXRlbV9pZCI6IjY2ZjUyMGI4ZTBkZDM1MzBkYWFhZWUwZiIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjE3LCJ0eXBlIjoibWluZXIiLCJ0aXRsZSI6eyJlbiI6Ik1pbmVyIFJld2FyZCIsImNuIjoiTWluZXIgUmV3YXJkIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24ifSwiaXRlbSI6eyJfaWQiOiI2NmY1MjBiOGUwZGQzNTMwZGFhYWVlMGYiLCJwb3dlciI6NTM5MDAwLCJ3aWR0aCI6MiwibmFtZSI6eyJlbiI6IlZhZGVyIEdsb3J5IiwiY24iOiJWYWRlciBHbG9yeSIsImVzIjoiVmFkZXIgR2xvcnkiLCJwdCI6IlZhZGVyIEdsb3J5In0sImRlc2NyaXB0aW9uIjp7ImVuIjoiQ2hhbm5lbHMgdGhlIGRhcmsgc2lkZSBvZiBjb3NtaWMgcG93ZXIgdG8gY29tbWFuZCBhbmQgY29ucXVlciwgaW5zdGlsbGluZyBhIGRlZXAtc2VhdGVkIGZlYXIgYWNyb3NzIGdhbGF4aWVzLiBCeSBDYXB0YWluTWF0dGhldyIsImNuIjoiQ2hhbm5lbHMgdGhlIGRhcmsgc2lkZSBvZiBjb3NtaWMgcG93ZXIgdG8gY29tbWFuZCBhbmQgY29ucXVlciwgaW5zdGlsbGluZyBhIGRlZXAtc2VhdGVkIGZlYXIgYWNyb3NzIGdhbGF4aWVzLiBCeSBDYXB0YWluTWF0dGhldyIsImVzIjoiQ2hhbm5lbHMgdGhlIGRhcmsgc2lkZSBvZiBjb3NtaWMgcG93ZXIgdG8gY29tbWFuZCBhbmQgY29ucXVlciwgaW5zdGlsbGluZyBhIGRlZXAtc2VhdGVkIGZlYXIgYWNyb3NzIGdhbGF4aWVzLiBCeSBDYXB0YWluTWF0dGhldyIsInB0IjoiQ2hhbm5lbHMgdGhlIGRhcmsgc2lkZSBvZiBjb3NtaWMgcG93ZXIgdG8gY29tbWFuZCBhbmQgY29ucXVlciwgaW5zdGlsbGluZyBhIGRlZXAtc2VhdGVkIGZlYXIgYWNyb3NzIGdhbGF4aWVzLiBCeSBDYXB0YWluTWF0dGhldyJ9LCJjcmVhdGVkX2J5X3RpdGxlIjp7ImxpbmsiOiIiLCJ0ZXh0IjoiIn0sImxldmVsIjowLCJ0eXBlIjoiYmFzaWMiLCJmaWxlbmFtZSI6InZhZGVyX2dsb3J5IiwiaXNfY2FuX2JlX3NvbGRfb25fbXAiOmZhbHNlLCJib251cyI6NDUsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjdiNWE3NjZhMjZjMzdjMzBmMzVhODRjIiwiaXRlbV9pZCI6IjY2NTQ5NjFjOTRmM2YzNTQxYzdmMWQ3ZCIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjE4LCJ0eXBlIjoibWluZXIiLCJ0aXRsZSI6eyJlbiI6Ik1pbmVyIFJld2FyZCIsImNuIjoiTWluZXIgUmV3YXJkIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24ifSwiaXRlbSI6eyJfaWQiOiI2NjU0OTYxYzk0ZjNmMzU0MWM3ZjFkN2QiLCJwb3dlciI6NzY0OTI1LCJ3aWR0aCI6MiwibmFtZSI6eyJlbiI6IkNyeXB0by1Db2xhIiwiY24iOiJDcnlwdG8tQ29sYSIsImVzIjoiQ3J5cHRvLUNvbGEiLCJwdCI6IkNyeXB0by1Db2xhIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiQ3J5cHRvLUNvbGEgTWluZXIgbGlrZSBjcmFja2luZyBvcGVuIGEgTnVrYS1Db2xhIFF1YW50dW3igJRzdXBlcmNoYXJnZWQgd2l0aCBudWNsZWFyLXBvd2VyZWQgaGFzaGluZyB0aGF0J3MgYm91bmQgdG8gY2F1c2UgYSBib29tIGluIHlvdXIgY3J5cHRvIHN0YXNoLCBqdXN0IGxpa2UgaW4gdGhlIHdhc3RlbGFuZCEiLCJjbiI6IkNyeXB0by1Db2xhIE1pbmVyIGxpa2UgY3JhY2tpbmcgb3BlbiBhIE51a2EtQ29sYSBRdWFudHVt4oCUc3VwZXJjaGFyZ2VkIHdpdGggbnVjbGVhci1wb3dlcmVkIGhhc2hpbmcgdGhhdCdzIGJvdW5kIHRvIGNhdXNlIGEgYm9vbSBpbiB5b3VyIGNyeXB0byBzdGFzaCwganVzdCBsaWtlIGluIHRoZSB3YXN0ZWxhbmQhIiwiZXMiOiJDcnlwdG8tQ29sYSBNaW5lciBsaWtlIGNyYWNraW5nIG9wZW4gYSBOdWthLUNvbGEgUXVhbnR1beKAlHN1cGVyY2hhcmdlZCB3aXRoIG51Y2xlYXItcG93ZXJlZCBoYXNoaW5nIHRoYXQncyBib3VuZCB0byBjYXVzZSBhIGJvb20gaW4geW91ciBjcnlwdG8gc3Rhc2gsIGp1c3QgbGlrZSBpbiB0aGUgd2FzdGVsYW5kISIsInB0IjoiQ3J5cHRvLUNvbGEgTWluZXIgbGlrZSBjcmFja2luZyBvcGVuIGEgTnVrYS1Db2xhIFF1YW50dW3igJRzdXBlcmNoYXJnZWQgd2l0aCBudWNsZWFyLXBvd2VyZWQgaGFzaGluZyB0aGF0J3MgYm91bmQgdG8gY2F1c2UgYSBib29tIGluIHlvdXIgY3J5cHRvIHN0YXNoLCBqdXN0IGxpa2UgaW4gdGhlIHdhc3RlbGFuZCEifSwiY3JlYXRlZF9ieV90aXRsZSI6eyJsaW5rIjoiIiwidGV4dCI6IiJ9LCJsZXZlbCI6MiwidHlwZSI6Im1lcmdlIiwiZmlsZW5hbWUiOiJjcnlwdG9fY29sYSIsImlzX2Nhbl9iZV9zb2xkX29uX21wIjpmYWxzZSwiYm9udXMiOjMxMCwiaXNfaW5fc2V0IjpmYWxzZX19LHsiaWQiOiI2N2I1YTc2NmEyNmMzN2MzMGYzNWE4NTAiLCJpdGVtX2lkIjoiNjMxZjc4YWU4MjM4ZWQyODNhMjMzMjIxIiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MTksInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjYzMWY3OGFlODIzOGVkMjgzYTIzMzIyMSIsInBvd2VyIjoxMTgxMjUwLCJ3aWR0aCI6MiwibmFtZSI6eyJlbiI6IlRoZSBOZW1lc2lzIiwiY24iOiJUaGUgTmVtZXNpcyJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6IkJlc3QgZW5lbXkgdG8gcG92ZXJ0eSBhbmQgaHVuZ2VyLCBUaGUgTmVtZXNpcyBsb29rcyBwZXJmZWN0IGluIHRoZSBjZW50ZXIgb2YgeW91ciByb29tLiBJZiB5b3Ugc2VlIHRlbnRha2xlcyBtb3ZlIOKAkyBwbGVhc2UgY2xvc2UgeW91ciBleWVzLiIsImNuIjoiQmVzdCBlbmVteSB0byBwb3ZlcnR5IGFuZCBodW5nZXIsIFRoZSBOZW1lc2lzIGxvb2tzIHBlcmZlY3QgaW4gdGhlIGNlbnRlciBvZiB5b3VyIHJvb20uIElmIHlvdSBzZWUgdGVudGFrbGVzIG1vdmUg4oCTIHBsZWFzZSBjbG9zZSB5b3VyIGV5ZXMuIn0sImNyZWF0ZWRfYnlfdGl0bGUiOnsibGluayI6IiIsInRleHQiOiIifSwibGV2ZWwiOjEsInR5cGUiOiJtZXJnZSIsImZpbGVuYW1lIjoidGhlX25lbWVzaXMiLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6dHJ1ZSwiYm9udXMiOjUyNSwiaXNfaW5fc2V0IjpmYWxzZX19LHsiaWQiOiI2N2I1YTc2NmEyNmMzN2MzMGYzNWE4NTQiLCJpdGVtX2lkIjoiNjdiNWE2YzZiYmUyN2JmNDcyYmE2Mjg5IiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MjAsInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjY3YjVhNmM2YmJlMjdiZjQ3MmJhNjI4OSIsInBvd2VyIjo4MzAwMDAwLCJ3aWR0aCI6MiwibmFtZSI6eyJlbiI6IkNyeXB0byBVbml2ZXJzZSIsImNuIjoiQ3J5cHRvIFVuaXZlcnNlIiwiZXMiOiJDcnlwdG8gVW5pdmVyc2UiLCJwdCI6IkNyeXB0byBVbml2ZXJzZSJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6IkEgYmVhY29uIGluIHRoZSB2YXN0IGV4cGFuc2Ugb2YgdGhlIGJsb2NrY2hhaW4sIHRoaXMgbWluZXIgaGFybmVzc2VzIHRoZSBwb3dlciBvZiB0aGUgY29zbW9zLiBMaWtlIGEgY2VsZXN0aWFsIGZvcmNlLCBpdCBwdWxscyBpbiBjcnlwdG8gcmV3YXJkcyBmcm9tIHRoZSBkZXB0aHMgb2Ygc3BhY2UsIHR1cm5pbmcgdGhlIHVuaXZlcnNlIGludG8gYW4gZW5kbGVzcyBzb3VyY2Ugb2Ygd2VhbHRoLiIsImNuIjoiQSBiZWFjb24gaW4gdGhlIHZhc3QgZXhwYW5zZSBvZiB0aGUgYmxvY2tjaGFpbiwgdGhpcyBtaW5lciBoYXJuZXNzZXMgdGhlIHBvd2VyIG9mIHRoZSBjb3Ntb3MuIExpa2UgYSBjZWxlc3RpYWwgZm9yY2UsIGl0IHB1bGxzIGluIGNyeXB0byByZXdhcmRzIGZyb20gdGhlIGRlcHRocyBvZiBzcGFjZSwgdHVybmluZyB0aGUgdW5pdmVyc2UgaW50byBhbiBlbmRsZXNzIHNvdXJjZSBvZiB3ZWFsdGguIiwiZXMiOiJBIGJlYWNvbiBpbiB0aGUgdmFzdCBleHBhbnNlIG9mIHRoZSBibG9ja2NoYWluLCB0aGlzIG1pbmVyIGhhcm5lc3NlcyB0aGUgcG93ZXIgb2YgdGhlIGNvc21vcy4gTGlrZSBhIGNlbGVzdGlhbCBmb3JjZSwgaXQgcHVsbHMgaW4gY3J5cHRvIHJld2FyZHMgZnJvbSB0aGUgZGVwdGhzIG9mIHNwYWNlLCB0dXJuaW5nIHRoZSB1bml2ZXJzZSBpbnRvIGFuIGVuZGxlc3Mgc291cmNlIG9mIHdlYWx0aC4iLCJwdCI6IkEgYmVhY29uIGluIHRoZSB2YXN0IGV4cGFuc2Ugb2YgdGhlIGJsb2NrY2hhaW4sIHRoaXMgbWluZXIgaGFybmVzc2VzIHRoZSBwb3dlciBvZiB0aGUgY29zbW9zLiBMaWtlIGEgY2VsZXN0aWFsIGZvcmNlLCBpdCBwdWxscyBpbiBjcnlwdG8gcmV3YXJkcyBmcm9tIHRoZSBkZXB0aHMgb2Ygc3BhY2UsIHR1cm5pbmcgdGhlIHVuaXZlcnNlIGludG8gYW4gZW5kbGVzcyBzb3VyY2Ugb2Ygd2VhbHRoLiJ9LCJjcmVhdGVkX2J5X3RpdGxlIjp7ImxpbmsiOiIiLCJ0ZXh0IjoiIn0sImxldmVsIjowLCJ0eXBlIjoiYmFzaWMiLCJmaWxlbmFtZSI6ImNyeXB0b191bml2ZXJzZSIsImlzX2Nhbl9iZV9zb2xkX29uX21wIjpmYWxzZSwiYm9udXMiOjYyMCwiaXNfaW5fc2V0IjpmYWxzZX19XSwibGV2ZWxzX2NvbmZpZyI6W3sibGV2ZWwiOjEsImxldmVsX3hwIjoxMDAwLCJyZXF1aXJlZF94cCI6MTAwMH0seyJsZXZlbCI6MiwibGV2ZWxfeHAiOjQwMDAsInJlcXVpcmVkX3hwIjo1MDAwfSx7ImxldmVsIjozLCJsZXZlbF94cCI6OTAwMCwicmVxdWlyZWRfeHAiOjE0MDAwfSx7ImxldmVsIjo0LCJsZXZlbF94cCI6MTUwMDAsInJlcXVpcmVkX3hwIjoyOTAwMH0seyJsZXZlbCI6NSwibGV2ZWxfeHAiOjIzMDAwLCJyZXF1aXJlZF94cCI6NTIwMDB9LHsibGV2ZWwiOjYsImxldmVsX3hwIjozMzAwMCwicmVxdWlyZWRfeHAiOjg1MDAwfSx7ImxldmVsIjo3LCJsZXZlbF94cCI6NzAwMDAsInJlcXVpcmVkX3hwIjoxNTUwMDB9LHsibGV2ZWwiOjgsImxldmVsX3hwIjoxMjAwMDAsInJlcXVpcmVkX3hwIjoyNzUwMDB9LHsibGV2ZWwiOjksImxldmVsX3hwIjoxNTAwMDAsInJlcXVpcmVkX3hwIjo0MjUwMDB9LHsibGV2ZWwiOjEwLCJsZXZlbF94cCI6MTgwMDAwLCJyZXF1aXJlZF94cCI6NjA1MDAwfSx7ImxldmVsIjoxMSwibGV2ZWxfeHAiOjIwMDAwMCwicmVxdWlyZWRfeHAiOjgwNTAwMH0seyJsZXZlbCI6MTIsImxldmVsX3hwIjoyMjAwMDAsInJlcXVpcmVkX3hwIjoxMDI1MDAwfSx7ImxldmVsIjoxMywibGV2ZWxfeHAiOjI0MDAwMCwicmVxdWlyZWRfeHAiOjEyNjUwMDB9LHsibGV2ZWwiOjE0LCJsZXZlbF94cCI6MjYwMDAwLCJyZXF1aXJlZF94cCI6MTUyNTAwMH0seyJsZXZlbCI6MTUsImxldmVsX3hwIjoyOTAwMDAsInJlcXVpcmVkX3hwIjoxODE1MDAwfSx7ImxldmVsIjoxNiwibGV2ZWxfeHAiOjMxMDAwMCwicmVxdWlyZWRfeHAiOjIxMjUwMDB9LHsibGV2ZWwiOjE3LCJsZXZlbF94cCI6MzMwMDAwLCJyZXF1aXJlZF94cCI6MjQ1NTAwMH0seyJsZXZlbCI6MTgsImxldmVsX3hwIjo1MDAwMDAsInJlcXVpcmVkX3hwIjoyOTU1MDAwfSx7ImxldmVsIjoxOSwibGV2ZWxfeHAiOjcwMDAwMCwicmVxdWlyZWRfeHAiOjM2NTUwMDB9LHsibGV2ZWwiOjIwLCJsZXZlbF94cCI6NjAwMDAwMCwicmVxdWlyZWRfeHAiOjk2NTUwMDB9XX0=";

// Função para converter valor em GHs, THs ou PHs com base no valor
function formatPower(value) {
    if (value >= 1e6) {
        // Base 9: PHs (Petahashes)
        return `${(value / 1e6).toFixed(2)} PHs`;
    } else if (value >= 1e3) {
        // Base 6: THs (Terahashes)
        return `${(value / 1e3).toFixed(2)} THs`;
    } else {
        // Valores menores que 1000
        return `${(value)} GHs`; // Supondo que para valores menores que 1000 a unidade seja Hashes
    }
}

// Função para decodificar a string BASE64
//function base64Decode(str) {
    //const decodedString = base64DecodeLarge(base64String);
    //const decoded = atob(str);
    //return decodeURIComponent(escape(decoded));
//}

// Decodifica a string BASE64 
const decodedString = base64DecodeLarge(base64String);
const jsonData = JSON.parse(decodedString);

// Extrai informações do JSON
const eventDescription = jsonData.event.title.en;
const rewards = jsonData.rewards;
const levelsConfig = jsonData.levels_config || [];

// Inicializa o total acumulado de XP
let totalXP = 0;
let totalPower = 0;
let totalBonus = 0;
let totalCustomValue = 0;

// Cria um mapa de níveis para XP
const levelXPMap = levelsConfig.reduce((acc, level) => {
    acc[level.level] = level.level_xp;
    return acc;
}, {});

// Função para converter nível em nome
function levelToName(level) {
    switch (level) {
        case 0: return "COMUM";
        case 1: return "INCOMUM";
        case 2: return "RARA";
        case 3: return "ÉPICA";
        case 4: return "LENDÁRIA";
        case 5: return "UNREAL";
        default: return "Desconhecido";
    }
}

// Função para atualizar os totais
function updateTotals() {
    totalBonus = 0;
    totalCustomValue = 0;

    // Itera sobre as linhas da tabela para somar os valores
    tableBody.querySelectorAll('tr').forEach(row => {
        let powerCell = row.children[4]; // Coluna 5 (Power)
        let bonusCell = row.children[5]; // Coluna 6 (Bonus)
        let customValueCell = row.children[7]; // Coluna 8 (Valores Personalizados)

        // Atualiza o total de Power
        if (powerCell) {
            let powerText = powerCell.textContent;
            // Extrai o número antes da unidade de formatação
            let powerValue = parseFloat(powerText);
            if (!isNaN(powerValue)) {
                totalPower += powerValue;
            }
        }

        // Atualiza o total de Bonus
        if (bonusCell && bonusCell.textContent.endsWith('%')) {
            let bonusValue = parseFloat(bonusCell.textContent);
            if (!isNaN(bonusValue)) {
                totalBonus += bonusValue;
            }
        }

        // Atualiza o total de Valores Personalizados
        let inputValue = customValueCell.querySelector('input');
        if (inputValue) {
            let inputValueNumber = parseFloat(inputValue.value) || 0;
            totalCustomValue += inputValueNumber;
        }
    });

    // Atualiza a linha de totais
    let totalRow = tableBody.querySelector('tr.total-row');
    if (totalRow) {
        // Atualiza a célula de Power
        totalRow.children[4].innerHTML = `Total Power<br>${formatPower(totalPower)}`;

        // Atualiza a célula de Bonus
        totalRow.children[5].innerHTML = `Total Bonus<br>${(totalBonus).toFixed(2)} %`;

        // Atualiza a célula de Valores Personalizados
        totalRow.children[7].innerHTML = `Valor Total<br>${totalCustomValue.toFixed(2)}`;
    }
}

// Função para adicionar a linha de totais
function addTotalsRow() {
    let row = document.createElement('tr');
    row.className = 'total-row';

    // Cria a célula para cada coluna, inicialmente vazia ou com rótulo
    for (let i = 0; i < 8; i++) {
        let cell = document.createElement('td');
        if (i === 4) { // Power
            cell.innerHTML = `Total Power<br>${formatPower(totalPower)}`;
        } else if (i === 5) { // Bonus
            cell.innerHTML = `Total Bonus<br>${(totalBonus).toFixed(2)} %`;
        } else if (i === 7) { // Custom Value
            cell.innerHTML = `Valor Total<br>${totalCustomValue.toFixed(2)}`;
        } else {
            cell.style.backgroundColor = '#ddd'; // Define o fundo da célula como cinza
            cell.textContent = ''; // Deixa o conteúdo da célula vazio
        }
        row.appendChild(cell);
    }

    tableBody.appendChild(row);
}

// Preenche o cabeçalho da tabela com o título do evento
const tableHeaderRow = document.querySelector('#nomeevento');
const headerCell = document.createElement('th');
headerCell.colSpan = 8; // Como há 8 colunas, faz sentido usar colSpan=8
headerCell.textContent = eventDescription;
tableHeaderRow.appendChild(headerCell);

// Preenche a tabela com os dados
const tableBody = document.querySelector('#dataTable tbody');

rewards.forEach(reward => {
    let row = document.createElement('tr');

    // Cria a célula para o nível
    let cellLevel = document.createElement('td');
    cellLevel.textContent = reward.required_level || '-';
    row.appendChild(cellLevel);
    
    // Calcula e atualiza o XP total
    let cellXPValue = levelXPMap[reward.required_level] || 0;
    totalXP += parseFloat(cellXPValue);

    let cellXP = document.createElement('td');
    cellXP.textContent = cellXPValue.toLocaleString() || '-';
    row.appendChild(cellXP);

    let cellTotalXP = document.createElement('td');
    cellTotalXP.textContent = Math.floor(totalXP).toLocaleString();
    row.appendChild(cellTotalXP);

    // Cria a célula para a quantidade e imagem
    let cellAmount = document.createElement('td');

    if (reward.type === 'money') {
        // Cria uma <div> para a imagem e a outra <div> para o texto
        let imageContainer = document.createElement('div');
        let textContainer = document.createElement('div');

        // Define a imagem fixa baseada na moeda
        let currencyImageURL = reward.currency === 'RLT'
            ? 'https://rollercoin.com/static/img/seasonPass/reward_RLT.png'
            : 'https://rollercoin.com/static/img/seasonPass/reward_RST.png';

        // Cria a imagem para a moeda
        let currencyImage = document.createElement('img');
        currencyImage.src = currencyImageURL;
        currencyImage.alt = reward.currency;
        currencyImage.style.width = '50px'; // Define o tamanho da imagem
        currencyImage.style.height = 'auto'; // Mantém a proporção da altura

        // Adiciona a imagem ao container da imagem
        imageContainer.appendChild(currencyImage);

        // Adiciona o container da imagem e o texto à célula
        cellAmount.appendChild(imageContainer);

        // Cria o texto para a quantidade
        let amountText = document.createElement('span');
        amountText.textContent = ` ${(reward.amount / 1000000).toFixed(2)} ${reward.currency}`;

        // Adiciona o texto ao container do texto
        textContainer.appendChild(amountText);

        // Adiciona o container do texto à célula
        cellAmount.appendChild(textContainer);
    } else if (reward.type === 'miner') {
        const item = reward.item || {};
        
        // Cria uma <div> para a imagem e a outra <div> para o texto
        let imageContainer = document.createElement('div');
        let textContainer = document.createElement('div');

        // Construa a URL da imagem do minerador
        const baseURL = "https://static.rollercoin.com/static/img/market/miners/";
        const filename = item.filename;
        const imageURL = `${baseURL}${filename}.gif`;

        // Cria o link para o minerador
        let minerLink = document.createElement('a');
        minerLink.href = `https://rollercoin.com/marketplace/buy/miner/${item._id}`;
        minerLink.target = "_blank"; // Abre em nova aba

        // Cria a imagem para o minerador
        let minerImage = document.createElement('img');
        minerImage.src = imageURL;
        minerImage.alt = item.name.en;
        minerImage.style.width = '50px'; // Define o tamanho da imagem
        minerImage.style.height = 'auto'; // Mantém a proporção da altura

        // Adiciona a imagem ao link
        minerLink.appendChild(minerImage);
        
        // Adiciona o link ao container da imagem
        imageContainer.appendChild(minerLink);

        // Cria o texto para o nível e nome do item
        let itemDetails = document.createElement('span');
        let levelName = levelToName(item.level); // Converte o nível para nome

        // Adiciona o nível em negrito e aplica a cor correta baseado no nome
        let levelSpan = document.createElement('span');
        levelSpan.style.fontWeight = 'bold'; // Aplica o negrito
        switch (levelName) {
            case "INCOMUM":
                levelSpan.style.color = '#2bff00'; // Verde para INCOMUM
                break;
            case "RARA":
                levelSpan.style.color = '#00eaff'; // Azul para RARA
                break;
            case "ÉPICA":
                levelSpan.style.color = '#ff00bb'; // Rosa para ÉPICA
                break;
            case "LENDÁRIA":
                levelSpan.style.color = '#fffb00'; // Amarelo para LENDÁRIA
                break;
            case "UNREAL":
                levelSpan.style.color = '#ff0000'; // Vermelho para UNREAL
                break;
            default:
                levelSpan.style.color = ''; // Mantém a cor padrão para COMUM ou desconhecido
        }

        // Define o texto com o nível
        levelSpan.textContent = ` ${levelName}`;

        // Adiciona o nome do item e o nível ao container de texto
        itemDetails.textContent = item.name?.en;
        itemDetails.appendChild(levelSpan);

        // Adiciona o texto ao container de texto
        textContainer.appendChild(itemDetails);

        // Adiciona os containers à célula
        cellAmount.appendChild(imageContainer);
        cellAmount.appendChild(textContainer);
    } else if (reward.type === 'power') {
        // Cria uma <div> para a imagem e a outra <div> para o texto
        let imageContainer = document.createElement('div');
        let textContainer = document.createElement('div');

        // Define a URL da imagem do poder temporário
        const powerImageURL = 'https://rollercoin.com/static/img/seasonPass/reward_power.png';

        // Cria a imagem para o poder temporário
        let powerImage = document.createElement('img');
        powerImage.src = powerImageURL;
        powerImage.alt = 'Power';
        powerImage.style.width = '50px'; // Define o tamanho da imagem
        powerImage.style.height = 'auto'; // Mantém a proporção da altura

        // Adiciona a imagem ao container da imagem
        imageContainer.appendChild(powerImage);

        // Formata o valor do poder
        let formattedPower = (reward.amount / 1000000).toFixed(2);

        // Cria o texto para a quantidade de poder
        let powerText = document.createElement('span');
        powerText.textContent = `${formattedPower} PHs Temporário`;

        // Adiciona o texto ao container de texto
        textContainer.appendChild(powerText);

        // Adiciona os containers à célula
        cellAmount.appendChild(imageContainer);
        cellAmount.appendChild(textContainer);
    } else if (reward.type === 'rack') {
        const item = reward.item || {};

        // Cria uma <div> para a imagem e a outra <div> para o texto
        let imageContainer = document.createElement('div');
        let textContainer = document.createElement('div');

        // Construa a URL da imagem do rack
        const baseURL = "https://static.rollercoin.com/static/img/market/racks/";
        const filename = item._id;
        const imageURL = `${baseURL}${filename}.png`;

        // Cria o link para o rack
        let rackLink = document.createElement('a');
        rackLink.href = `https://rollercoin.com/marketplace/buy/rack/${item._id}`;
        rackLink.target = "_blank"; // Abre em nova aba

        // Cria a imagem para o rack
        let rackImage = document.createElement('img');
        rackImage.src = imageURL;
        rackImage.alt = item.name.en;
        rackImage.style.width = '50px'; // Define o tamanho da imagem
        rackImage.style.height = 'auto'; // Mantém a proporção da altura

        // Adiciona a imagem ao link
        rackLink.appendChild(rackImage);
        
        // Adiciona o link ao container da imagem
        imageContainer.appendChild(rackLink);

        // Cria o texto para o nome do item
        let itemDetails = document.createElement('span');
        itemDetails.textContent = `${item.name?.en}`;

        // Adiciona o texto ao container de texto
        textContainer.appendChild(itemDetails);

        // Adiciona os containers à célula
        cellAmount.appendChild(imageContainer);
        cellAmount.appendChild(textContainer);
    } else if (reward.type === 'season_pass_xp') {
    // Cria uma <div> para a imagem e a outra <div> para o texto
    let imageContainer = document.createElement('div');
    let textContainer = document.createElement('div');

    // URL da imagem XP
    const xpImageURL = 'https://minaryganar.com/wp-content/uploads/2024/03/EXP.png';

    // Cria a imagem para XP
    let xpImage = document.createElement('img');
    xpImage.src = xpImageURL;
    xpImage.alt = 'XP';
    xpImage.style.width = '50px'; // Define o tamanho da imagem
    xpImage.style.height = 'auto'; // Mantém a proporção da altura

    // Adiciona a imagem ao container da imagem
    imageContainer.appendChild(xpImage);

    // Cria o texto para a quantidade de XP
    let amountText = document.createElement('span');
    amountText.textContent = ` ${reward.amount} XP`; // Exibe o amount seguido de XP

    // Adiciona o texto ao container de texto
    textContainer.appendChild(amountText);

    // Adiciona os containers à célula
    cellAmount.appendChild(imageContainer);
    cellAmount.appendChild(textContainer);
} else {
    cellAmount.textContent = '-';
}

    row.appendChild(cellAmount);

    let cellPower = document.createElement('td');
    let rawPowerValue = reward.item?.power || 0;
    if (rawPowerValue) {
        totalPower += rawPowerValue;
    }
    cellPower.textContent = reward.item?.power ? formatPower(reward.item.power) : '-';
    row.appendChild(cellPower);

    let cellBonus = document.createElement('td');
    const bonus = reward.item?.bonus != null ? (reward.item?.bonus / 100).toFixed(2) : '-';
    cellBonus.textContent = bonus !== '-' ? `${bonus} %` : '-';
    row.appendChild(cellBonus);

    let cellCanBeSoldOnMP = document.createElement('td');
    if (reward.type === 'rack') {
        // Se o tipo for 'rack', o conteúdo será sempre vazio (resultando em true)
        cellCanBeSoldOnMP.textContent = '';
    } else {
        // Caso contrário, mantém a lógica original
        cellCanBeSoldOnMP.textContent = reward.item?.is_can_be_sold_on_mp ? '' : 'X';
    }
    row.appendChild(cellCanBeSoldOnMP);

    // Nova célula para o valor personalizado, editável pelo usuário
    let cellCustomValue = document.createElement('td');
    let input = document.createElement('input');
    input.type = 'number';  // Define o tipo como numérico
    input.name = 'cellValor';  // Nome para identificação do input
    input.value = '';  // Valor padrão

    input.className = 'input-custom'; // Adiciona a classe personalizada
    cellCustomValue.appendChild(input);
    row.appendChild(cellCustomValue);

    tableBody.appendChild(row);
});

// Adiciona a linha de totais
addTotalsRow();

// Atualiza os totais inicialmente
updateTotals();

// Adiciona um evento de mudança a cada input da coluna 8
tableBody.addEventListener('input', event => {
    if (event.target.tagName === 'INPUT') {
        updateTotals();
    }
});

// Define o título da página
document.title = `RKFox - ${eventDescription}`;

// Adiciona funcionalidade de modo escuro
document.getElementById('toggle-dark-mode').addEventListener('change', (event) => {
    if (event.target.checked) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});
