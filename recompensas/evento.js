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
const base64String = "eyJldmVudCI6eyJfaWQiOiI2NzcyYzQ2YTRlNWQyNmE0NGJmYWUwNzgiLCJtYXhfeHAiOjUyNzEyMDAwLCJtYXhfbXVsdGlwbGllciI6MTAwMDAsIm1heF9sZXZlbCI6MzcsInByb2dyZXNzaW9uX2V2ZW50X3R5cGUiOiJkZWZhdWx0IiwiZW5kX2RhdGUiOiIyMDI1LTAxLTA0VDE1OjAwOjAwLjAwMFoiLCJsYXN0X3VwZGF0ZWQiOjE3MzU1NzQ2MzQyOTksImRlc2NyaXB0aW9uIjp7ImVuIjoiWzAx4oCTMDQgSmFuXSBIYW5nb3ZlciEg4oCUIFByb2dyZXNzaW9uIEV2ZW50IiwiY24iOiJbMDHigJMwNCBKYW5dIEhhbmdvdmVyISDigJQgUHJvZ3Jlc3Npb24gRXZlbnQifSwidGl0bGUiOnsiZW4iOiJIYW5nb3ZlciEiLCJjbiI6IkhhbmdvdmVyISJ9fSwicmV3YXJkcyI6W3siaWQiOiI2NzcyYzQ2YWEyNmMzN2MzMGZjY2RkM2EiLCJpdGVtX2lkIjpudWxsLCJhbW91bnQiOjUwMDAwMDAwLCJjdXJyZW5jeSI6IlJTVCIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MSwidHlwZSI6Im1vbmV5IiwidGl0bGUiOnsiZW4iOiJNb25leSBUaXRsZSIsImNuIjoiTW9uZXkgVGl0bGUifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNb25leSBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1vbmV5IFJld2FyZCBEZXNjcmlwdGlvbiJ9fSx7ImlkIjoiNjc3MmM0NmFhMjZjMzdjMzBmY2NkZDQ0IiwiaXRlbV9pZCI6bnVsbCwiYW1vdW50Ijo1MDAwMDAsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjYwNDgwMDAwMCwicmVxdWlyZWRfbGV2ZWwiOjIsInR5cGUiOiJwb3dlciIsInRpdGxlIjp7ImVuIjoiUG93ZXIiLCJjbiI6IlBvd2VyIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiUG93ZXIgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJQb3dlciBSZXdhcmQgRGVzY3JpcHRpb24ifX0seyJpZCI6IjY3NzJjNDZhYTI2YzM3YzMwZmNjZGQ0ZCIsIml0ZW1faWQiOm51bGwsImFtb3VudCI6MTAsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjozLCJ0eXBlIjoic2Vhc29uX3Bhc3NfeHAiLCJ0aXRsZSI6eyJlbiI6IlNlYXNvbiBQYXNzIFhQIiwiY24iOiJTZWFzb24gUGFzcyBYUCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6IlNlYXNvbiBQYXNzIFhQIERlc2NyaXB0aW9uIiwiY24iOiJTZWFzb24gUGFzcyBYUCBEZXNjcmlwdGlvbiJ9fSx7ImlkIjoiNjc3MmM0NmFhMjZjMzdjMzBmY2NkZDU4IiwiaXRlbV9pZCI6IjY0ZWM5MTRjMjJjNzUxMTBiOWIwOTU2MiIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjQsInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjY0ZWM5MTRjMjJjNzUxMTBiOWIwOTU2MiIsImNyZWF0ZWRfYnlfdGl0bGUiOnsibGluayI6IiIsInRleHQiOiIifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJJdCBpcyBub3QgYSBjb3B5IG9mIE1lcmdlZGdlLiBOby4gQWJzb2x1dGVseSBub3QuIEJyYW5kLW5ldyBtaW5lci4gRXZlbiBiaW5kaW5nIHZhbHVlIGlzIGRpZmZlcmVudCEgVG90YWxseSBuZXcgbWluZXIuIiwiY24iOiJJdCBpcyBub3QgYSBjb3B5IG9mIE1lcmdlZGdlLiBOby4gQWJzb2x1dGVseSBub3QuIEJyYW5kLW5ldyBtaW5lci4gRXZlbiBiaW5kaW5nIHZhbHVlIGlzIGRpZmZlcmVudCEgVG90YWxseSBuZXcgbWluZXIuIiwiZXMiOiJJdCBpcyBub3QgYSBjb3B5IG9mIE1lcmdlZGdlLiBOby4gQWJzb2x1dGVseSBub3QuIEJyYW5kLW5ldyBtaW5lci4gRXZlbiBiaW5kaW5nIHZhbHVlIGlzIGRpZmZlcmVudCEgVG90YWxseSBuZXcgbWluZXIuIiwicHQiOiJJdCBpcyBub3QgYSBjb3B5IG9mIE1lcmdlZGdlLiBOby4gQWJzb2x1dGVseSBub3QuIEJyYW5kLW5ldyBtaW5lci4gRXZlbiBiaW5kaW5nIHZhbHVlIGlzIGRpZmZlcmVudCEgVG90YWxseSBuZXcgbWluZXIuIn0sImZpbGVuYW1lIjoiYmVyZ2VkZ2UiLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6ZmFsc2UsImxldmVsIjozLCJuYW1lIjp7ImVuIjoiQmVyZ2VkZ2UiLCJjbiI6IkJlcmdlZGdlIiwiZXMiOiJCZXJnZWRnZSIsInB0IjoiQmVyZ2VkZ2UifSwicG93ZXIiOjY1NDE1LCJ0eXBlIjoibWVyZ2UiLCJ3aWR0aCI6MiwiYm9udXMiOjQxLCJpc19pbl9zZXQiOmZhbHNlfX0seyJpZCI6IjY3NzJjNDZhYTI2YzM3YzMwZmNjZGQ1ZSIsIml0ZW1faWQiOiI2NGVjOTE0YzIyYzc1MTEwYjliMDk1NGUiLCJhbW91bnQiOjEsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjo1LCJ0eXBlIjoibWluZXIiLCJ0aXRsZSI6eyJlbiI6Ik1pbmVyIFJld2FyZCIsImNuIjoiTWluZXIgUmV3YXJkIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24ifSwiaXRlbSI6eyJfaWQiOiI2NGVjOTE0YzIyYzc1MTEwYjliMDk1NGUiLCJjcmVhdGVkX2J5X3RpdGxlIjp7ImxpbmsiOiIiLCJ0ZXh0IjoiIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiSXQgaXMgbm90IGEgY29weSBvZiBNZXJnZWRnZS4gTm8uIEFic29sdXRlbHkgbm90LiBCcmFuZC1uZXcgbWluZXIuIEV2ZW4gYmluZGluZyB2YWx1ZSBpcyBkaWZmZXJlbnQhIFRvdGFsbHkgbmV3IG1pbmVyLiIsImNuIjoiSXQgaXMgbm90IGEgY29weSBvZiBNZXJnZWRnZS4gTm8uIEFic29sdXRlbHkgbm90LiBCcmFuZC1uZXcgbWluZXIuIEV2ZW4gYmluZGluZyB2YWx1ZSBpcyBkaWZmZXJlbnQhIFRvdGFsbHkgbmV3IG1pbmVyLiIsImVzIjoiSXQgaXMgbm90IGEgY29weSBvZiBNZXJnZWRnZS4gTm8uIEFic29sdXRlbHkgbm90LiBCcmFuZC1uZXcgbWluZXIuIEV2ZW4gYmluZGluZyB2YWx1ZSBpcyBkaWZmZXJlbnQhIFRvdGFsbHkgbmV3IG1pbmVyLiIsInB0IjoiSXQgaXMgbm90IGEgY29weSBvZiBNZXJnZWRnZS4gTm8uIEFic29sdXRlbHkgbm90LiBCcmFuZC1uZXcgbWluZXIuIEV2ZW4gYmluZGluZyB2YWx1ZSBpcyBkaWZmZXJlbnQhIFRvdGFsbHkgbmV3IG1pbmVyLiJ9LCJmaWxlbmFtZSI6ImJlcmdlZGdlIiwiaXNfY2FuX2JlX3NvbGRfb25fbXAiOmZhbHNlLCJsZXZlbCI6MSwibmFtZSI6eyJlbiI6IkJlcmdlZGdlIiwiY24iOiJCZXJnZWRnZSIsImVzIjoiQmVyZ2VkZ2UiLCJwdCI6IkJlcmdlZGdlIn0sInBvd2VyIjo5NDUwLCJ0eXBlIjoibWVyZ2UiLCJ3aWR0aCI6MiwiYm9udXMiOjgsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjc3MmM0NmFhMjZjMzdjMzBmY2NkZDY1IiwiaXRlbV9pZCI6IjY1ODU1OTY1NDMwMjAzYmFiMmI3NWIxYyIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjYsInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjY1ODU1OTY1NDMwMjAzYmFiMmI3NWIxYyIsInBvd2VyIjoxNjUwMCwid2lkdGgiOjIsIm5hbWUiOnsiZW4iOiJBbmNpZW50IEljZWNyYWZ0IiwiY24iOiJBbmNpZW50IEljZWNyYWZ0IiwiZXMiOiJBbmNpZW50IEljZWNyYWZ0IiwicHQiOiJBbmNpZW50IEljZWNyYWZ0In0sImRlc2NyaXB0aW9uIjp7ImVuIjoiQW5jaWVudCBJY2VjcmFmdCwgYSBtaW5lciBzaHJvdWRlZCBpbiBlbGRlciBtYWdpYywgY3JhZnRzIGJsb2NrcyB3aXRoIGFuIHVucmVhbCBmaW5lc3NlLCB0YXBwaW5nIGludG8gdGhlIG9sZGVzdCBhbmQgbW9zdCBteXN0aWNhbCBlbmVyZ2llcyBvZiB0aGUgYmxvY2tjaGFpbi4gSXRzIGljeSB0b3VjaCB3ZWF2ZXMgYSBzcGVsbCBvZiBmb3J0dW5lLCB0dXJuaW5nIGRhdGEgaW50byBkaWdpdGFsIGdvbGQgd2l0aCBhIHdoaXNwZXIgb2YgYW5jaWVudCBzZWNyZXRzLiIsImNuIjoiQW5jaWVudCBJY2VjcmFmdCwgYSBtaW5lciBzaHJvdWRlZCBpbiBlbGRlciBtYWdpYywgY3JhZnRzIGJsb2NrcyB3aXRoIGFuIHVucmVhbCBmaW5lc3NlLCB0YXBwaW5nIGludG8gdGhlIG9sZGVzdCBhbmQgbW9zdCBteXN0aWNhbCBlbmVyZ2llcyBvZiB0aGUgYmxvY2tjaGFpbi4gSXRzIGljeSB0b3VjaCB3ZWF2ZXMgYSBzcGVsbCBvZiBmb3J0dW5lLCB0dXJuaW5nIGRhdGEgaW50byBkaWdpdGFsIGdvbGQgd2l0aCBhIHdoaXNwZXIgb2YgYW5jaWVudCBzZWNyZXRzLiIsImVzIjoiQW5jaWVudCBJY2VjcmFmdCwgYSBtaW5lciBzaHJvdWRlZCBpbiBlbGRlciBtYWdpYywgY3JhZnRzIGJsb2NrcyB3aXRoIGFuIHVucmVhbCBmaW5lc3NlLCB0YXBwaW5nIGludG8gdGhlIG9sZGVzdCBhbmQgbW9zdCBteXN0aWNhbCBlbmVyZ2llcyBvZiB0aGUgYmxvY2tjaGFpbi4gSXRzIGljeSB0b3VjaCB3ZWF2ZXMgYSBzcGVsbCBvZiBmb3J0dW5lLCB0dXJuaW5nIGRhdGEgaW50byBkaWdpdGFsIGdvbGQgd2l0aCBhIHdoaXNwZXIgb2YgYW5jaWVudCBzZWNyZXRzLiIsInB0IjoiQW5jaWVudCBJY2VjcmFmdCwgYSBtaW5lciBzaHJvdWRlZCBpbiBlbGRlciBtYWdpYywgY3JhZnRzIGJsb2NrcyB3aXRoIGFuIHVucmVhbCBmaW5lc3NlLCB0YXBwaW5nIGludG8gdGhlIG9sZGVzdCBhbmQgbW9zdCBteXN0aWNhbCBlbmVyZ2llcyBvZiB0aGUgYmxvY2tjaGFpbi4gSXRzIGljeSB0b3VjaCB3ZWF2ZXMgYSBzcGVsbCBvZiBmb3J0dW5lLCB0dXJuaW5nIGRhdGEgaW50byBkaWdpdGFsIGdvbGQgd2l0aCBhIHdoaXNwZXIgb2YgYW5jaWVudCBzZWNyZXRzLiJ9LCJjcmVhdGVkX2J5X3RpdGxlIjp7ImxpbmsiOiIiLCJ0ZXh0IjoiIn0sImxldmVsIjowLCJ0eXBlIjoiYmFzaWMiLCJmaWxlbmFtZSI6ImFuY2llbnRfaWNlY3JhZnQiLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6ZmFsc2UsImJvbnVzIjowLCJpc19pbl9zZXQiOmZhbHNlfX0seyJpZCI6IjY3NzJjNDZhYTI2YzM3YzMwZmNjZGQ2ZSIsIml0ZW1faWQiOiI2NGVjOTE0YzIyYzc1MTEwYjliMDk1NTgiLCJhbW91bnQiOjEsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjo3LCJ0eXBlIjoibWluZXIiLCJ0aXRsZSI6eyJlbiI6Ik1pbmVyIFJld2FyZCIsImNuIjoiTWluZXIgUmV3YXJkIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24ifSwiaXRlbSI6eyJfaWQiOiI2NGVjOTE0YzIyYzc1MTEwYjliMDk1NTgiLCJjcmVhdGVkX2J5X3RpdGxlIjp7ImxpbmsiOiIiLCJ0ZXh0IjoiIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiSXQgaXMgbm90IGEgY29weSBvZiBNZXJnZWRnZS4gTm8uIEFic29sdXRlbHkgbm90LiBCcmFuZC1uZXcgbWluZXIuIEV2ZW4gYmluZGluZyB2YWx1ZSBpcyBkaWZmZXJlbnQhIFRvdGFsbHkgbmV3IG1pbmVyLiIsImNuIjoiSXQgaXMgbm90IGEgY29weSBvZiBNZXJnZWRnZS4gTm8uIEFic29sdXRlbHkgbm90LiBCcmFuZC1uZXcgbWluZXIuIEV2ZW4gYmluZGluZyB2YWx1ZSBpcyBkaWZmZXJlbnQhIFRvdGFsbHkgbmV3IG1pbmVyLiIsImVzIjoiSXQgaXMgbm90IGEgY29weSBvZiBNZXJnZWRnZS4gTm8uIEFic29sdXRlbHkgbm90LiBCcmFuZC1uZXcgbWluZXIuIEV2ZW4gYmluZGluZyB2YWx1ZSBpcyBkaWZmZXJlbnQhIFRvdGFsbHkgbmV3IG1pbmVyLiIsInB0IjoiSXQgaXMgbm90IGEgY29weSBvZiBNZXJnZWRnZS4gTm8uIEFic29sdXRlbHkgbm90LiBCcmFuZC1uZXcgbWluZXIuIEV2ZW4gYmluZGluZyB2YWx1ZSBpcyBkaWZmZXJlbnQhIFRvdGFsbHkgbmV3IG1pbmVyLiJ9LCJmaWxlbmFtZSI6ImJlcmdlZGdlIiwiaXNfY2FuX2JlX3NvbGRfb25fbXAiOmZhbHNlLCJsZXZlbCI6MiwibmFtZSI6eyJlbiI6IkJlcmdlZGdlIiwiY24iOiJCZXJnZWRnZSIsImVzIjoiQmVyZ2VkZ2UiLCJwdCI6IkJlcmdlZGdlIn0sInBvd2VyIjoyNDg4NSwidHlwZSI6Im1lcmdlIiwid2lkdGgiOjIsImJvbnVzIjoyMCwiaXNfaW5fc2V0IjpmYWxzZX19LHsiaWQiOiI2NzcyYzQ2YWEyNmMzN2MzMGZjY2RkNzQiLCJpdGVtX2lkIjoiNjUwMDQzODYyMjE2ZTE4NDFlYmE4NTQyIiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6OCwidHlwZSI6Im1pbmVyIiwidGl0bGUiOnsiZW4iOiJNaW5lciBSZXdhcmQiLCJjbiI6Ik1pbmVyIFJld2FyZCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIn0sIml0ZW0iOnsiX2lkIjoiNjUwMDQzODYyMjE2ZTE4NDFlYmE4NTQyIiwicG93ZXIiOjEwODY3NSwid2lkdGgiOjEsIm5hbWUiOnsiZW4iOiJCaXRBY2UiLCJjbiI6IkJpdEFjZSIsImVzIjoiQml0QWNlIiwicHQiOiJCaXRBY2UifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJZb3VyIGNyeXB0byBtaW5pbmcgYWNlIiwiY24iOiJZb3VyIGNyeXB0byBtaW5pbmcgYWNlIiwiZXMiOiJZb3VyIGNyeXB0byBtaW5pbmcgYWNlIiwicHQiOiJZb3VyIGNyeXB0byBtaW5pbmcgYWNlIn0sImNyZWF0ZWRfYnlfdGl0bGUiOnsibGluayI6IiIsInRleHQiOiIifSwibGV2ZWwiOjMsInR5cGUiOiJtZXJnZSIsImZpbGVuYW1lIjoiYml0YWNlIiwiaXNfY2FuX2JlX3NvbGRfb25fbXAiOmZhbHNlLCJib251cyI6NDEsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjc3MmM0NmFhMjZjMzdjMzBmY2NkZDc5IiwiaXRlbV9pZCI6bnVsbCwiYW1vdW50IjoxMDAwMDAwLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjo2MDQ4MDAwMDAsInJlcXVpcmVkX2xldmVsIjo5LCJ0eXBlIjoicG93ZXIiLCJ0aXRsZSI6eyJlbiI6IlBvd2VyIiwiY24iOiJQb3dlciJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6IlBvd2VyIFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiUG93ZXIgUmV3YXJkIERlc2NyaXB0aW9uIn19LHsiaWQiOiI2NzcyYzQ2YWEyNmMzN2MzMGZjY2RkODAiLCJpdGVtX2lkIjoiNjRlYzkxNGMyMmM3NTExMGI5YjA5NTRlIiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MTAsInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjY0ZWM5MTRjMjJjNzUxMTBiOWIwOTU0ZSIsImNyZWF0ZWRfYnlfdGl0bGUiOnsibGluayI6IiIsInRleHQiOiIifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJJdCBpcyBub3QgYSBjb3B5IG9mIE1lcmdlZGdlLiBOby4gQWJzb2x1dGVseSBub3QuIEJyYW5kLW5ldyBtaW5lci4gRXZlbiBiaW5kaW5nIHZhbHVlIGlzIGRpZmZlcmVudCEgVG90YWxseSBuZXcgbWluZXIuIiwiY24iOiJJdCBpcyBub3QgYSBjb3B5IG9mIE1lcmdlZGdlLiBOby4gQWJzb2x1dGVseSBub3QuIEJyYW5kLW5ldyBtaW5lci4gRXZlbiBiaW5kaW5nIHZhbHVlIGlzIGRpZmZlcmVudCEgVG90YWxseSBuZXcgbWluZXIuIiwiZXMiOiJJdCBpcyBub3QgYSBjb3B5IG9mIE1lcmdlZGdlLiBOby4gQWJzb2x1dGVseSBub3QuIEJyYW5kLW5ldyBtaW5lci4gRXZlbiBiaW5kaW5nIHZhbHVlIGlzIGRpZmZlcmVudCEgVG90YWxseSBuZXcgbWluZXIuIiwicHQiOiJJdCBpcyBub3QgYSBjb3B5IG9mIE1lcmdlZGdlLiBOby4gQWJzb2x1dGVseSBub3QuIEJyYW5kLW5ldyBtaW5lci4gRXZlbiBiaW5kaW5nIHZhbHVlIGlzIGRpZmZlcmVudCEgVG90YWxseSBuZXcgbWluZXIuIn0sImZpbGVuYW1lIjoiYmVyZ2VkZ2UiLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6ZmFsc2UsImxldmVsIjoxLCJuYW1lIjp7ImVuIjoiQmVyZ2VkZ2UiLCJjbiI6IkJlcmdlZGdlIiwiZXMiOiJCZXJnZWRnZSIsInB0IjoiQmVyZ2VkZ2UifSwicG93ZXIiOjk0NTAsInR5cGUiOiJtZXJnZSIsIndpZHRoIjoyLCJib251cyI6OCwiaXNfaW5fc2V0IjpmYWxzZX19LHsiaWQiOiI2NzcyYzQ2YWEyNmMzN2MzMGZjY2RkODYiLCJpdGVtX2lkIjoiNjUwMDQzODYyMjE2ZTE4NDFlYmE4NTQyIiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MTEsInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjY1MDA0Mzg2MjIxNmUxODQxZWJhODU0MiIsInBvd2VyIjoxMDg2NzUsIndpZHRoIjoxLCJuYW1lIjp7ImVuIjoiQml0QWNlIiwiY24iOiJCaXRBY2UiLCJlcyI6IkJpdEFjZSIsInB0IjoiQml0QWNlIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiWW91ciBjcnlwdG8gbWluaW5nIGFjZSIsImNuIjoiWW91ciBjcnlwdG8gbWluaW5nIGFjZSIsImVzIjoiWW91ciBjcnlwdG8gbWluaW5nIGFjZSIsInB0IjoiWW91ciBjcnlwdG8gbWluaW5nIGFjZSJ9LCJjcmVhdGVkX2J5X3RpdGxlIjp7ImxpbmsiOiIiLCJ0ZXh0IjoiIn0sImxldmVsIjozLCJ0eXBlIjoibWVyZ2UiLCJmaWxlbmFtZSI6ImJpdGFjZSIsImlzX2Nhbl9iZV9zb2xkX29uX21wIjpmYWxzZSwiYm9udXMiOjQxLCJpc19pbl9zZXQiOmZhbHNlfX0seyJpZCI6IjY3NzJjNDZhYTI2YzM3YzMwZmNjZGQ4ZCIsIml0ZW1faWQiOm51bGwsImFtb3VudCI6MjUwMDAwMDAwLCJjdXJyZW5jeSI6IlJTVCIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MTIsInR5cGUiOiJtb25leSIsInRpdGxlIjp7ImVuIjoiTW9uZXkgVGl0bGUiLCJjbiI6Ik1vbmV5IFRpdGxlIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTW9uZXkgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNb25leSBSZXdhcmQgRGVzY3JpcHRpb24ifX0seyJpZCI6IjY3NzJjNDZhYTI2YzM3YzMwZmNjZGRhNiIsIml0ZW1faWQiOiI2NDQ5MGY4MzU0N2NmYWI5YTI3M2M4OTQiLCJhbW91bnQiOjEsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjoxMywidHlwZSI6InJhY2siLCJ0aXRsZSI6eyJlbiI6IlJhY2sgVGl0bGUiLCJjbiI6IlJhY2sgVGl0bGUifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJSYWNrIFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiUmFjayBSZXdhcmQgRGVzY3JpcHRpb24ifSwiaXRlbSI6eyJuYW1lIjp7ImVuIjoiRnVyeSBSYWNrIDgiLCJjbiI6IkZ1cnkgUmFjayA4In0sImRlc2NyaXB0aW9uIjp7ImVuIjoiV2l0aCBlaWdodCBzbG90cyBhbmQgYSBib251cyBwb3dlciBvZiAzJSwgdGhpcyByYWNrIHByb3ZpZGVzIGEgYm9vc3QgdG8geW91ciBtaW5pbmcgb3BlcmF0aW9uLCBhbmQgaXRzIHN0cmlraW5nIGRlc2lnbiBpcyB3aGF0IHRydWx5IHNldHMgaXQgYXBhcnQhIFdoZXRoZXIgeW91J3JlIGEgZmFuIG9mIEZ1cnkgUm9hZCB2aWJlLCBvciB5b3XigJlyZSBzaW1wbHkgaW50byBtaW5pbmcsIHRoZSBGdXJ5IFJhY2sgOCBpcyBzdXJlIHRvIGltcHJlc3MhIiwiY24iOiJXaXRoIGVpZ2h0IHNsb3RzIGFuZCBhIGJvbnVzIHBvd2VyIG9mIDMlLCB0aGlzIHJhY2sgcHJvdmlkZXMgYSBib29zdCB0byB5b3VyIG1pbmluZyBvcGVyYXRpb24sIGFuZCBpdHMgc3RyaWtpbmcgZGVzaWduIGlzIHdoYXQgdHJ1bHkgc2V0cyBpdCBhcGFydCEgV2hldGhlciB5b3UncmUgYSBmYW4gb2YgRnVyeSBSb2FkIHZpYmUsIG9yIHlvdeKAmXJlIHNpbXBseSBpbnRvIG1pbmluZywgdGhlIEZ1cnkgUmFjayA4IGlzIHN1cmUgdG8gaW1wcmVzcyEifSwiX2lkIjoiNjQ0OTBmODM1NDdjZmFiOWEyNzNjODk0IiwiY2FwYWNpdHkiOjgsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjc3MmM0NmFhMjZjMzdjMzBmY2NkZGFlIiwiaXRlbV9pZCI6IjYxYjljY2UxNzhkNjNkNjRjZDYyNmZjYiIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjE0LCJ0eXBlIjoibWluZXIiLCJ0aXRsZSI6eyJlbiI6Ik1pbmVyIFJld2FyZCIsImNuIjoiTWluZXIgUmV3YXJkIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24ifSwiaXRlbSI6eyJfaWQiOiI2MWI5Y2NlMTc4ZDYzZDY0Y2Q2MjZmY2IiLCJuYW1lIjp7ImVuIjoiR3Jhbm554oCZcyBDYWtlIiwiY24iOiJHcmFubnnigJlzIENha2UiLCJlcyI6IkdyYW5ueeKAmXMgQ2FrZSIsInB0IjoiR3Jhbm554oCZcyBDYWtlIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiSXQgd2FzIGJha2VkIHRvIGEgc2VjcmV0IEdyYW5kbWHigJlzIHJlY2lwZS4gTWl4IG9mIHN3ZWV0bmVzcyBhbmQgcG93ZXIgdGhhdCBpcyB0cnVseSBpbXByZXNzaXZlLiBKdXN0IGdpdmUgaXQgYSB0cnkhIENocmlzdG1hcyBUaW1lIFNlcmllcyBNaW5lci4iLCJjbiI6Ikl0IHdhcyBiYWtlZCB0byBhIHNlY3JldCBHcmFuZG1h4oCZcyByZWNpcGUuIE1peCBvZiBzd2VldG5lc3MgYW5kIHBvd2VyIHRoYXQgaXMgdHJ1bHkgaW1wcmVzc2l2ZS4gSnVzdCBnaXZlIGl0IGEgdHJ5ISBDaHJpc3RtYXMgVGltZSBTZXJpZXMgTWluZXIuIiwiZXMiOiJJdCB3YXMgYmFrZWQgdG8gYSBzZWNyZXQgR3JhbmRtYeKAmXMgcmVjaXBlLiBNaXggb2Ygc3dlZXRuZXNzIGFuZCBwb3dlciB0aGF0IGlzIHRydWx5IGltcHJlc3NpdmUuIEp1c3QgZ2l2ZSBpdCBhIHRyeSEgQ2hyaXN0bWFzIFRpbWUgU2VyaWVzIE1pbmVyLiIsInB0IjoiSXQgd2FzIGJha2VkIHRvIGEgc2VjcmV0IEdyYW5kbWHigJlzIHJlY2lwZS4gTWl4IG9mIHN3ZWV0bmVzcyBhbmQgcG93ZXIgdGhhdCBpcyB0cnVseSBpbXByZXNzaXZlLiBKdXN0IGdpdmUgaXQgYSB0cnkhIENocmlzdG1hcyBUaW1lIFNlcmllcyBNaW5lci4ifSwibGV2ZWwiOjAsInR5cGUiOiJiYXNpYyIsInBvd2VyIjoxMjUwMDAsIndpZHRoIjoyLCJmaWxlbmFtZSI6ImdyYW5ueXNfY2FrZSIsImlzX2Nhbl9iZV9zb2xkX29uX21wIjpmYWxzZSwiY3JlYXRlZF9ieV90aXRsZSI6eyJsaW5rIjoiIiwidGV4dCI6IiJ9LCJib251cyI6MjAwLCJpc19pbl9zZXQiOmZhbHNlfX0seyJpZCI6IjY3NzJjNDZhYTI2YzM3YzMwZmNjZGRiNSIsIml0ZW1faWQiOm51bGwsImFtb3VudCI6NTAsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjoxNSwidHlwZSI6InNlYXNvbl9wYXNzX3hwIiwidGl0bGUiOnsiZW4iOiJTZWFzb24gUGFzcyBYUCIsImNuIjoiU2Vhc29uIFBhc3MgWFAifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJTZWFzb24gUGFzcyBYUCBEZXNjcmlwdGlvbiIsImNuIjoiU2Vhc29uIFBhc3MgWFAgRGVzY3JpcHRpb24ifX0seyJpZCI6IjY3NzJjNDZhYTI2YzM3YzMwZmNjZGRiZCIsIml0ZW1faWQiOm51bGwsImFtb3VudCI6ODAwMDAwMDAwLCJjdXJyZW5jeSI6IlJTVCIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MTYsInR5cGUiOiJtb25leSIsInRpdGxlIjp7ImVuIjoiTW9uZXkgVGl0bGUiLCJjbiI6Ik1vbmV5IFRpdGxlIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTW9uZXkgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNb25leSBSZXdhcmQgRGVzY3JpcHRpb24ifX0seyJpZCI6IjY3NzJjNDZhYTI2YzM3YzMwZmNjZGRjMyIsIml0ZW1faWQiOiI2MzFmNzkxNjgyMzhlZDI4M2EyMzM2ZjQiLCJhbW91bnQiOjEsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjoxNywidHlwZSI6Im1pbmVyIiwidGl0bGUiOnsiZW4iOiJNaW5lciBSZXdhcmQiLCJjbiI6Ik1pbmVyIFJld2FyZCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIn0sIml0ZW0iOnsiX2lkIjoiNjMxZjc5MTY4MjM4ZWQyODNhMjMzNmY0IiwicG93ZXIiOjE5Njg3NSwid2lkdGgiOjEsIm5hbWUiOnsiZW4iOiJEYXNoZXLigJlzIFNsZWQiLCJjbiI6IkRhc2hlcuKAmXMgU2xlZCIsImVzIjoiRGFzaGVy4oCZcyBTbGVkIiwicHQiOiJEYXNoZXLigJlzIFNsZWQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJUaGUgZmFzdGVzdCByZWluZGVlciBvZiB0aGUgd2hvbGUgcGFjayB3aWxsIHRha2UgeW91IHRvIHRoZSBuZXcgbGV2ZWwgb2YgY3J5cHRvIG1pbmluZy4gQ2hyaXN0bWFzIFRpbWUgU2VyaWVzIE1pbmVyLiIsImNuIjoiVGhlIGZhc3Rlc3QgcmVpbmRlZXIgb2YgdGhlIHdob2xlIHBhY2sgd2lsbCB0YWtlIHlvdSB0byB0aGUgbmV3IGxldmVsIG9mIGNyeXB0byBtaW5pbmcuIENocmlzdG1hcyBUaW1lIFNlcmllcyBNaW5lci4iLCJlcyI6IlRoZSBmYXN0ZXN0IHJlaW5kZWVyIG9mIHRoZSB3aG9sZSBwYWNrIHdpbGwgdGFrZSB5b3UgdG8gdGhlIG5ldyBsZXZlbCBvZiBjcnlwdG8gbWluaW5nLiBDaHJpc3RtYXMgVGltZSBTZXJpZXMgTWluZXIuIiwicHQiOiJUaGUgZmFzdGVzdCByZWluZGVlciBvZiB0aGUgd2hvbGUgcGFjayB3aWxsIHRha2UgeW91IHRvIHRoZSBuZXcgbGV2ZWwgb2YgY3J5cHRvIG1pbmluZy4gQ2hyaXN0bWFzIFRpbWUgU2VyaWVzIE1pbmVyLiJ9LCJjcmVhdGVkX2J5X3RpdGxlIjp7ImxpbmsiOiIiLCJ0ZXh0IjoiIn0sImxldmVsIjoxLCJ0eXBlIjoibWVyZ2UiLCJmaWxlbmFtZSI6ImRhc2hlcnNfc2xlZCIsImlzX2Nhbl9iZV9zb2xkX29uX21wIjpmYWxzZSwiYm9udXMiOjE1OCwiaXNfaW5fc2V0IjpmYWxzZX19LHsiaWQiOiI2NzcyYzQ2YWEyNmMzN2MzMGZjY2RkYzkiLCJpdGVtX2lkIjoiNjMxZjc5MTE4MjM4ZWQyODNhMjMzNmIzIiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MTgsInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjYzMWY3OTExODIzOGVkMjgzYTIzMzZiMyIsInBvd2VyIjozMjgxMjUsIndpZHRoIjoyLCJuYW1lIjp7ImVuIjoiR3Jhbm554oCZcyBDYWtlIiwiY24iOiJHcmFubnnigJlzIENha2UiLCJlcyI6IkdyYW5ueeKAmXMgQ2FrZSIsInB0IjoiR3Jhbm554oCZcyBDYWtlIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiSXQgd2FzIGJha2VkIHRvIGEgc2VjcmV0IEdyYW5kbWHigJlzIHJlY2lwZS4gTWl4IG9mIHN3ZWV0bmVzcyBhbmQgcG93ZXIgdGhhdCBpcyB0cnVseSBpbXByZXNzaXZlLiBKdXN0IGdpdmUgaXQgYSB0cnkhIENocmlzdG1hcyBUaW1lIFNlcmllcyBNaW5lci4iLCJjbiI6Ikl0IHdhcyBiYWtlZCB0byBhIHNlY3JldCBHcmFuZG1h4oCZcyByZWNpcGUuIE1peCBvZiBzd2VldG5lc3MgYW5kIHBvd2VyIHRoYXQgaXMgdHJ1bHkgaW1wcmVzc2l2ZS4gSnVzdCBnaXZlIGl0IGEgdHJ5ISBDaHJpc3RtYXMgVGltZSBTZXJpZXMgTWluZXIuIiwiZXMiOiJJdCB3YXMgYmFrZWQgdG8gYSBzZWNyZXQgR3JhbmRtYeKAmXMgcmVjaXBlLiBNaXggb2Ygc3dlZXRuZXNzIGFuZCBwb3dlciB0aGF0IGlzIHRydWx5IGltcHJlc3NpdmUuIEp1c3QgZ2l2ZSBpdCBhIHRyeSEgQ2hyaXN0bWFzIFRpbWUgU2VyaWVzIE1pbmVyLiIsInB0IjoiSXQgd2FzIGJha2VkIHRvIGEgc2VjcmV0IEdyYW5kbWHigJlzIHJlY2lwZS4gTWl4IG9mIHN3ZWV0bmVzcyBhbmQgcG93ZXIgdGhhdCBpcyB0cnVseSBpbXByZXNzaXZlLiBKdXN0IGdpdmUgaXQgYSB0cnkhIENocmlzdG1hcyBUaW1lIFNlcmllcyBNaW5lci4ifSwiY3JlYXRlZF9ieV90aXRsZSI6eyJsaW5rIjoiIiwidGV4dCI6IiJ9LCJsZXZlbCI6MSwidHlwZSI6Im1lcmdlIiwiZmlsZW5hbWUiOiJncmFubnlzX2Nha2UiLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6ZmFsc2UsImJvbnVzIjoyMTAsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjc3MmM0NmFhMjZjMzdjMzBmY2NkZGNkIiwiaXRlbV9pZCI6IjY0ZDYyOTliNmQ3MDA4MTQ4NTc1ZGY3OSIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjE5LCJ0eXBlIjoicmFjayIsInRpdGxlIjp7ImVuIjoiUmFjayBUaXRsZSIsImNuIjoiUmFjayBUaXRsZSJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6IlJhY2sgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJSYWNrIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Im5hbWUiOnsiZW4iOiJTaWx2ZXIgUmFjayA4IiwiY24iOiJTaWx2ZXIgUmFjayA4In0sImRlc2NyaXB0aW9uIjp7ImVuIjoiV2hlbiB5b3UgYXNrZWQgdGhlIHNlbGxlciBhYm91dCB0aGUgbWF0ZXJpYWwgb2YgdGhpcyByYWNrLCBoZSBqb2tpbmdseSByZXNwb25kZWQgd2l0aCAnU2lsdmVyLicgSXQgc2VlbXMgaGUgaGFkIHF1aXRlIGFuIHVudXN1YWwgc2Vuc2Ugb2YgaHVtb3IsIGJ1dCB0aGlzIHN0dXJkeSBhbmQgc3BhY2lvdXMgJ1NpbHZlcicgUmFjayBmb3IgbWluZXJzIHByb3ZlcyB0aGF0IHRoZXJlJ3MgbW9yZSB0byBpdCB0aGFuIG1lZXRzIHRoZSBleWUuIiwiY24iOiJXaGVuIHlvdSBhc2tlZCB0aGUgc2VsbGVyIGFib3V0IHRoZSBtYXRlcmlhbCBvZiB0aGlzIHJhY2ssIGhlIGpva2luZ2x5IHJlc3BvbmRlZCB3aXRoICdTaWx2ZXIuJyBJdCBzZWVtcyBoZSBoYWQgcXVpdGUgYW4gdW51c3VhbCBzZW5zZSBvZiBodW1vciwgYnV0IHRoaXMgc3R1cmR5IGFuZCBzcGFjaW91cyAnU2lsdmVyJyBSYWNrIGZvciBtaW5lcnMgcHJvdmVzIHRoYXQgdGhlcmUncyBtb3JlIHRvIGl0IHRoYW4gbWVldHMgdGhlIGV5ZS4ifSwiX2lkIjoiNjRkNjI5OWI2ZDcwMDgxNDg1NzVkZjc5IiwiY2FwYWNpdHkiOjgsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjc3MmM0NmFhMjZjMzdjMzBmY2NkZGQxIiwiaXRlbV9pZCI6IjYzMWY3N2I1ODIzOGVkMjgzYTIzMjZjMSIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjIwLCJ0eXBlIjoibWluZXIiLCJ0aXRsZSI6eyJlbiI6Ik1pbmVyIFJld2FyZCIsImNuIjoiTWluZXIgUmV3YXJkIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24ifSwiaXRlbSI6eyJfaWQiOiI2MzFmNzdiNTgyMzhlZDI4M2EyMzI2YzEiLCJwb3dlciI6MTEwMjUwMCwid2lkdGgiOjIsIm5hbWUiOnsiZW4iOiJTYW50YSBTbGVpZ2giLCJjbiI6IlNhbnRhIFNsZWlnaCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6IkNocmlzdG1hcyB2aWJlIGlzIHJlYWwhIENlbGVicmF0ZSB0aGUgZGF5IHdpdGggdGhlIG5ldyBTYW50YSBTbGVpZ2ggbWluZXIhIE9ubHkgYXZhaWxhYmxlIGZvciBwdXJjaGFzZSBkdXJpbmcgdGhlIE5ldyBZZWFyIHNlYXNvbi4iLCJjbiI6IuS4juaWsOeahOWco";

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
