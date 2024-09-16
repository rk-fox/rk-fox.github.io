// Substitua esta string pelo seu código BASE64
const base64String = "eyJldmVudCI6eyJfaWQiOiI2NmU4NDc4YWUwZGQzNTMwZGE5MTYwOWMiLCJtYXhfeHAiOjE1MjQ2MDAwLCJtYXhfbXVsdGlwbGllciI6MTAwMDAsIm1heF9sZXZlbCI6MTYsInByb2dyZXNzaW9uX2V2ZW50X3R5cGUiOiJkZWZhdWx0IiwiZW5kX2RhdGUiOiIyMDI0LTA5LTE5VDE0OjU5OjAwLjAwMFoiLCJsYXN0X3VwZGF0ZWQiOjE3MjY0OTg2OTg4NjMsImRlc2NyaXB0aW9uIjp7ImVuIjoiWzE24oCTMTldIEVuZGxlc3MgU3VtbWVyIOKAlCBQRSIsImNuIjoiWzE24oCTMTldIEVuZGxlc3MgU3VtbWVyIOKAlCBQRSJ9LCJ0aXRsZSI6eyJlbiI6IkVuZGxlc3MgU3VtbWVyIiwiY24iOiJFbmRsZXNzIFN1bW1lciJ9fSwicmV3YXJkcyI6W3siaWQiOiI2NmU4NDc4YmEyNmMzN2MzMGYwNGQ5OGEiLCJpdGVtX2lkIjpudWxsLCJhbW91bnQiOjE1MDAwMCwiY3VycmVuY3kiOiJSTFQiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjEsInR5cGUiOiJtb25leSIsInRpdGxlIjp7ImVuIjoiTW9uZXkgVGl0bGUiLCJjbiI6Ik1vbmV5IFRpdGxlIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTW9uZXkgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNb25leSBSZXdhcmQgRGVzY3JpcHRpb24ifX0seyJpZCI6IjY2ZTg0NzhiYTI2YzM3YzMwZjA0ZDk4ZiIsIml0ZW1faWQiOiI2NGY1ZDcxZTllNGQ2Mjg2NDA4OTJhMDgiLCJhbW91bnQiOjEsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjoyLCJ0eXBlIjoibWluZXIiLCJ0aXRsZSI6eyJlbiI6Ik1pbmVyIFJld2FyZCIsImNuIjoiTWluZXIgUmV3YXJkIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24ifSwiaXRlbSI6eyJfaWQiOiI2NGY1ZDcxZTllNGQ2Mjg2NDA4OTJhMDgiLCJwb3dlciI6MjQwMCwid2lkdGgiOjEsIm5hbWUiOnsiZW4iOiJBU0lDYml0IiwiY24iOiJBU0lDYml0IiwiZXMiOiJBU0lDYml0IiwicHQiOiJBU0lDYml0In0sImRlc2NyaXB0aW9uIjp7ImVuIjoiVGhpcyBpcyBhIG1pbmVyLiBGb3IgbWluaW5nIGNyeXB0by4gUHJhY3RpY2FsLCBzaW1wbGUgYW5kIHdpdGggcG93ZXIgY2FwYWNpdHkgY29udHJvbGxlciIsImNuIjoiVGhpcyBpcyBhIG1pbmVyLiBGb3IgbWluaW5nIGNyeXB0by4gUHJhY3RpY2FsLCBzaW1wbGUgYW5kIHdpdGggcG93ZXIgY2FwYWNpdHkgY29udHJvbGxlciIsImVzIjoiVGhpcyBpcyBhIG1pbmVyLiBGb3IgbWluaW5nIGNyeXB0by4gUHJhY3RpY2FsLCBzaW1wbGUgYW5kIHdpdGggcG93ZXIgY2FwYWNpdHkgY29udHJvbGxlciIsInB0IjoiVGhpcyBpcyBhIG1pbmVyLiBGb3IgbWluaW5nIGNyeXB0by4gUHJhY3RpY2FsLCBzaW1wbGUgYW5kIHdpdGggcG93ZXIgY2FwYWNpdHkgY29udHJvbGxlciJ9LCJjcmVhdGVkX2J5X3RpdGxlIjp7ImxpbmsiOiIiLCJ0ZXh0IjoiIn0sImxldmVsIjowLCJ0eXBlIjoiYmFzaWMiLCJmaWxlbmFtZSI6ImFzaWNiaXQiLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6ZmFsc2UsImJvbnVzIjowLCJpc19pbl9zZXQiOmZhbHNlfX0seyJpZCI6IjY2ZTg0NzhiYTI2YzM3YzMwZjA0ZDk5NSIsIml0ZW1faWQiOm51bGwsImFtb3VudCI6NTAwMDAwMDAsImN1cnJlbmN5IjoiUlNUIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjozLCJ0eXBlIjoibW9uZXkiLCJ0aXRsZSI6eyJlbiI6Ik1vbmV5IFRpdGxlIiwiY24iOiJNb25leSBUaXRsZSJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6Ik1vbmV5IFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiTW9uZXkgUmV3YXJkIERlc2NyaXB0aW9uIn19LHsiaWQiOiI2NmU4NDc4YmEyNmMzN2MzMGYwNGQ5OWIiLCJpdGVtX2lkIjpudWxsLCJhbW91bnQiOjEwMDAwMDAsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjYwNDgwMDAwMCwicmVxdWlyZWRfbGV2ZWwiOjQsInR5cGUiOiJwb3dlciIsInRpdGxlIjp7ImVuIjoiUG93ZXIiLCJjbiI6IlBvd2VyIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiUG93ZXIgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJQb3dlciBSZXdhcmQgRGVzY3JpcHRpb24ifX0seyJpZCI6IjY2ZTg0NzhiYTI2YzM3YzMwZjA0ZDlhMiIsIml0ZW1faWQiOiI2NGE2OTdiNGFmN2NhYWJiM2QxMTUxZmMiLCJhbW91bnQiOjEsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjo1LCJ0eXBlIjoibWluZXIiLCJ0aXRsZSI6eyJlbiI6Ik1pbmVyIFJld2FyZCIsImNuIjoiTWluZXIgUmV3YXJkIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24ifSwiaXRlbSI6eyJfaWQiOiI2NGE2OTdiNGFmN2NhYWJiM2QxMTUxZmMiLCJwb3dlciI6OTQ1MDAsIndpZHRoIjoyLCJuYW1lIjp7ImVuIjoiVHJlYXN1cmUgSHVudGVyIiwiY24iOiJUcmVhc3VyZSBIdW50ZXIifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJQbHVnIGl0IGluIHdoZXJldmVyIHlvdSBhcmUsIGFuZCBtaW5lIGNvaW5zIHdvcmxkd2lkZSEgV2hlbiB3b3JraW5nLCBsb2NhdGVzIGJlcnJpZWQgdHJlYXN1cmUgYW5kIGRlbGl2ZXJzIGl0IHRvIHlvdSBvbiBhIGhpZ2ggc3BlZWQhIFRvcCBzYWxlcyBhbW9uZyBhY3RpdmUgdHJhdmVsZXJzISIsImNuIjoiUGx1ZyBpdCBpbiB3aGVyZXZlciB5b3UgYXJlLCBhbmQgbWluZSBjb2lucyB3b3JsZHdpZGUhIFdoZW4gd29ya2luZywgbG9jYXRlcyBiZXJyaWVkIHRyZWFzdXJlIGFuZCBkZWxpdmVycyBpdCB0byB5b3Ugb24gYSBoaWdoIHNwZWVkISBUb3Agc2FsZXMgYW1vbmcgYWN0aXZlIHRyYXZlbGVycyEifSwiY3JlYXRlZF9ieV90aXRsZSI6eyJsaW5rIjoiIiwidGV4dCI6IiJ9LCJsZXZlbCI6MCwidHlwZSI6ImJhc2ljIiwiZmlsZW5hbWUiOiJ0cmVhc3VyZV9odW50ZXIiLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6dHJ1ZSwiYm9udXMiOjAsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjZlODQ3OGJhMjZjMzdjMzBmMDRkOWFhIiwiaXRlbV9pZCI6bnVsbCwiYW1vdW50IjoxMDAwMDAwMDAsImN1cnJlbmN5IjoiUlNUIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjo2LCJ0eXBlIjoibW9uZXkiLCJ0aXRsZSI6eyJlbiI6Ik1vbmV5IFRpdGxlIiwiY24iOiJNb25leSBUaXRsZSJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6Ik1vbmV5IFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiTW9uZXkgUmV3YXJkIERlc2NyaXB0aW9uIn19LHsiaWQiOiI2NmU4NDc4YmEyNmMzN2MzMGYwNGQ5YWUiLCJpdGVtX2lkIjoiNjQ5ZDcwZTUzMzVkNmEwZGU0Y2EzOTEyIiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6NywidHlwZSI6Im1pbmVyIiwidGl0bGUiOnsiZW4iOiJNaW5lciBSZXdhcmQiLCJjbiI6Ik1pbmVyIFJld2FyZCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIn0sIml0ZW0iOnsiX2lkIjoiNjQ5ZDcwZTUzMzVkNmEwZGU0Y2EzOTEyIiwicG93ZXIiOjI3MDAwMCwid2lkdGgiOjIsIm5hbWUiOnsiZW4iOiJUaGUgTW9uZXkgTWFrZXIiLCJjbiI6IlRoZSBNb25leSBNYWtlciIsImVzIjoiVGhlIE1vbmV5IE1ha2VyIiwicHQiOiJUaGUgTW9uZXkgTWFrZXIifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJUaGUgc3Bpcml0IG9mIHRoZSBCdWxsIGFuZCB0aGUgdGVuYWNpdHkgb2YgdGhlIEJlYXIsIHRoaXMgbWluZXIgaGFzIHRoZSBzYW1lIHN0cmVuZ3RoIGFuZCByZXNpbGllbmNlIGFzIHRoZSBBbWVyaWNhbiBmaW5hbmNpYWwgc3lzdGVtIGFuZCByZWFkeSB0byBoZWxwIHlvdSBidWlsZCB5b3VyIGNyeXB0byBmb3J0dW5lISBDcmVhdGVkIGJ5SGVsbWVyIiwiY24iOiJUaGUgc3Bpcml0IG9mIHRoZSBCdWxsIGFuZCB0aGUgdGVuYWNpdHkgb2YgdGhlIEJlYXIsIHRoaXMgbWluZXIgaGFzIHRoZSBzYW1lIHN0cmVuZ3RoIGFuZCByZXNpbGllbmNlIGFzIHRoZSBBbWVyaWNhbiBmaW5hbmNpYWwgc3lzdGVtIGFuZCByZWFkeSB0byBoZWxwIHlvdSBidWlsZCB5b3VyIGNyeXB0byBmb3J0dW5lISBDcmVhdGVkIGJ5SGVsbWVyIiwiZXMiOiJUaGUgc3Bpcml0IG9mIHRoZSBCdWxsIGFuZCB0aGUgdGVuYWNpdHkgb2YgdGhlIEJlYXIsIHRoaXMgbWluZXIgaGFzIHRoZSBzYW1lIHN0cmVuZ3RoIGFuZCByZXNpbGllbmNlIGFzIHRoZSBBbWVyaWNhbiBmaW5hbmNpYWwgc3lzdGVtIGFuZCByZWFkeSB0byBoZWxwIHlvdSBidWlsZCB5b3VyIGNyeXB0byBmb3J0dW5lISBDcmVhdGVkIGJ5SGVsbWVyIiwicHQiOiJUaGUgc3Bpcml0IG9mIHRoZSBCdWxsIGFuZCB0aGUgdGVuYWNpdHkgb2YgdGhlIEJlYXIsIHRoaXMgbWluZXIgaGFzIHRoZSBzYW1lIHN0cmVuZ3RoIGFuZCByZXNpbGllbmNlIGFzIHRoZSBBbWVyaWNhbiBmaW5hbmNpYWwgc3lzdGVtIGFuZCByZWFkeSB0byBoZWxwIHlvdSBidWlsZCB5b3VyIGNyeXB0byBmb3J0dW5lISBDcmVhdGVkIGJ5SGVsbWVyIn0sImNyZWF0ZWRfYnlfdGl0bGUiOnsibGluayI6IiIsInRleHQiOiJIZWxtZXIifSwibGV2ZWwiOjAsInR5cGUiOiJiYXNpYyIsImZpbGVuYW1lIjoidGhlX21vbmV5X21ha2VyIiwiaXNfY2FuX2JlX3NvbGRfb25fbXAiOnRydWUsImJvbnVzIjoxMDAsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjZlODQ3OGJhMjZjMzdjMzBmMDRkOWIyIiwiaXRlbV9pZCI6IjY1NzFhYjc2Y2E4YmZlZjM0YWRjZDllYSIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjgsInR5cGUiOiJyYWNrIiwidGl0bGUiOnsiZW4iOiJSYWNrIFRpdGxlIiwiY24iOiJSYWNrIFRpdGxlIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiUmFjayBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6IlJhY2sgUmV3YXJkIERlc2NyaXB0aW9uIn0sIml0ZW0iOnsibmFtZSI6eyJlbiI6IkZlc3RpdmUgUmFjayA4IiwiY24iOiJGZXN0aXZlIFJhY2sgOCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6IkJhc2sgaW4gdGhlIHJhZGlhbnQgZ2xvdyBvZiBGZXN0aXZlIFJhY2sgOCwgd2hlcmUgdGhlIGhvbGlkYXkgbGlnaHRzIHdlYXZlIGEgZGF6emxpbmcgdGFwZXN0cnkgb2Ygam95IiwiY24iOiJCYXNrIGluIHRoZSByYWRpYW50IGdsb3cgb2YgRmVzdGl2ZSBSYWNrIDgsIHdoZXJlIHRoZSBob2xpZGF5IGxpZ2h0cyB3ZWF2ZSBhIGRhenpsaW5nIHRhcGVzdHJ5IG9mIGpveSJ9LCJfaWQiOiI2NTcxYWI3NmNhOGJmZWYzNGFkY2Q5ZWEiLCJjYXBhY2l0eSI6OCwiaXNfaW5fc2V0IjpmYWxzZX19LHsiaWQiOiI2NmU4NDc4YmEyNmMzN2MzMGYwNGQ5YjYiLCJpdGVtX2lkIjoiNjU3MzE3YzkyNzZmYmM2MDkyMDUxZDUyIiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6OSwidHlwZSI6Im1pbmVyIiwidGl0bGUiOnsiZW4iOiJNaW5lciBSZXdhcmQiLCJjbiI6Ik1pbmVyIFJld2FyZCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIn0sIml0ZW0iOnsiX2lkIjoiNjU3MzE3YzkyNzZmYmM2MDkyMDUxZDUyIiwicG93ZXIiOjY2NjAwMCwid2lkdGgiOjIsIm5hbWUiOnsiZW4iOiJDaGEtQ2hhLUNoZXdpZSIsImNuIjoiQ2hhLUNoYS1DaGV3aWUiLCJlcyI6IkNoYS1DaGEtQ2hld2llIiwicHQiOiJDaGEtQ2hhLUNoZXdpZSJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6IlBpbnQtc2l6ZWQgZHluYW1vIHdpdGggbW9yZSBzaGkuLi4gcG93ZXIgdGhhbiB5b3UnZCBiZWxpZXZlISBUaGlzIENoaWh1YWh1YSBpcyBhIGRhbmNpbmcgc2Vuc2F0aW9uLCBhbmQgaWYgQ2hld2llIHRvb2sgcGFydCBpbiBFdXJvdmlzaW9uLCBpdCB3b3VsZCB1bmRvdWJ0ZWRseSB0YWtlIGhvbWUgdGhlIGdvbGQhIEdldCByZWFkeSB0byBncm9vdmUgd2l0aCB0aGUgdGluaWVzdCBkYW5jZXIgaW4gdG93biBiZWNhdXNlIHRoZSAnQ2hhLWNoYS1jaGEnIGRhbmNlIHdpbGwgYWx3YXlzIGJlIHRoZSBpbW1vcnRhbCBkYW5jZSBjbGFzc2ljLiIsImNuIjoiUGludC1zaXplZCBkeW5hbW8gd2l0aCBtb3JlIHNoaS4uLiBwb3dlciB0aGFuIHlvdSdkIGJlbGlldmUhIFRoaXMgQ2hpaHVhaHVhIGlzIGEgZGFuY2luZyBzZW5zYXRpb24sIGFuZCBpZiBDaGV3aWUgdG9vayBwYXJ0IGluIEV1cm92aXNpb24sIGl0IHdvdWxkIHVuZG91YnRlZGx5IHRha2UgaG9tZSB0aGUgZ29sZCEgR2V0IHJlYWR5IHRvIGdyb292ZSB3aXRoIHRoZSB0aW5pZXN0IGRhbmNlciBpbiB0b3duIGJlY2F1c2UgdGhlICdDaGEtY2hhLWNoYScgZGFuY2Ugd2lsbCBhbHdheXMgYmUgdGhlIGltbW9ydGFsIGRhbmNlIGNsYXNzaWMuIiwiZXMiOiJQaW50LXNpemVkIGR5bmFtbyB3aXRoIG1vcmUgc2hpLi4uIHBvd2VyIHRoYW4geW91J2QgYmVsaWV2ZSEgVGhpcyBDaGlodWFodWEgaXMgYSBkYW5jaW5nIHNlbnNhdGlvbiwgYW5kIGlmIENoZXdpZSB0b29rIHBhcnQgaW4gRXVyb3Zpc2lvbiwgaXQgd291bGQgdW5kb3VidGVkbHkgdGFrZSBob21lIHRoZSBnb2xkISBHZXQgcmVhZHkgdG8gZ3Jvb3ZlIHdpdGggdGhlIHRpbmllc3QgZGFuY2VyIGluIHRvd24gYmVjYXVzZSB0aGUgJ0NoYS1jaGEtY2hhJyBkYW5jZSB3aWxsIGFsd2F5cyBiZSB0aGUgaW1tb3J0YWwgZGFuY2UgY2xhc3NpYy4iLCJwdCI6IlBpbnQtc2l6ZWQgZHluYW1vIHdpdGggbW9yZSBzaGkuLi4gcG93ZXIgdGhhbiB5b3UnZCBiZWxpZXZlISBUaGlzIENoaWh1YWh1YSBpcyBhIGRhbmNpbmcgc2Vuc2F0aW9uLCBhbmQgaWYgQ2hld2llIHRvb2sgcGFydCBpbiBFdXJvdmlzaW9uLCBpdCB3b3VsZCB1bmRvdWJ0ZWRseSB0YWtlIGhvbWUgdGhlIGdvbGQhIEdldCByZWFkeSB0byBncm9vdmUgd2l0aCB0aGUgdGluaWVzdCBkYW5jZXIgaW4gdG93biBiZWNhdXNlIHRoZSAnQ2hhLWNoYS1jaGEnIGRhbmNlIHdpbGwgYWx3YXlzIGJlIHRoZSBpbW1vcnRhbCBkYW5jZSBjbGFzc2ljLiJ9LCJjcmVhdGVkX2J5X3RpdGxlIjp7ImxpbmsiOiIiLCJ0ZXh0IjoiIn0sImxldmVsIjowLCJ0eXBlIjoiYmFzaWMiLCJmaWxlbmFtZSI6ImNoYV9jaGFfY2hld2llIiwiaXNfY2FuX2JlX3NvbGRfb25fbXAiOnRydWUsImJvbnVzIjoxMDAsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjZlODQ3OGJhMjZjMzdjMzBmMDRkOWJhIiwiaXRlbV9pZCI6IjY0MzZjZTdhNTQ3Y2ZhYjlhMmQzNDYyNSIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjEwLCJ0eXBlIjoibWluZXIiLCJ0aXRsZSI6eyJlbiI6Ik1pbmVyIFJld2FyZCIsImNuIjoiTWluZXIgUmV3YXJkIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24ifSwiaXRlbSI6eyJfaWQiOiI2NDM2Y2U3YTU0N2NmYWI5YTJkMzQ2MjUiLCJwb3dlciI6Njc3MzAwLCJ3aWR0aCI6MiwibmFtZSI6eyJlbiI6IkNyeXB0byBDb21ibyIsImNuIjoiQ3J5cHRvIENvbWJvIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiVHJ1ZSB0YXN0ZSBvZiBBbWVyaWNhIGluIHRoZSB3b3JsZCBvZiBjcnlwdG8gbWluaW5nISBEb24ndCBzZXR0bGUgZm9yIGxlc3MgdGhhbiB0aGUgYmVzdCwgdHJ5IHRoZSBDcnlwdG8gQ29tYm8gdG9kYXkgYW5kIHNhdGlzZnkgeW91ciBodW5nZXIgZm9yIGNyeXB0byBwcm9maXRzLiBDcmVhdGVkIGJ5S2FpemFraSBaYW4iLCJjbiI6IlRydWUgdGFzdGUgb2YgQW1lcmljYSBpbiB0aGUgd29ybGQgb2YgY3J5cHRvIG1pbmluZyEgRG9uJ3Qgc2V0dGxlIGZvciBsZXNzIHRoYW4gdGhlIGJlc3QsIHRyeSB0aGUgQ3J5cHRvIENvbWJvIHRvZGF5IGFuZCBzYXRpc2Z5IHlvdXIgaHVuZ2VyIGZvciBjcnlwdG8gcHJvZml0cy4gQ3JlYXRlZCBieUthaXpha2kgWmFuIn0sImNyZWF0ZWRfYnlfdGl0bGUiOnsidGV4dCI6IkthaXpha2kgWmFuIiwibGluayI6IiJ9LCJsZXZlbCI6MCwidHlwZSI6ImJhc2ljIiwiZmlsZW5hbWUiOiJjcnlwdG9fY29tYm8iLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6dHJ1ZSwiYm9udXMiOjE1MCwiaXNfaW5fc2V0IjpmYWxzZX19LHsiaWQiOiI2NmU4NDc4YmEyNmMzN2MzMGYwNGQ5YmUiLCJpdGVtX2lkIjoiNjMxZjdhODI4MjM4ZWQyODNhMjM0N2I2IiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MTEsInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjYzMWY3YTgyODIzOGVkMjgzYTIzNDdiNiIsInBvd2VyIjo5MTg3NTAsIndpZHRoIjoyLCJuYW1lIjp7ImVuIjoiSWNlZC1vdXQnLUNyZWFtIiwiY24iOiJJY2VkLW91dCctQ3JlYW0ifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJXaGF0J3MgYmV0dGVyIHRoYW4gaWNlIGNyZWFtIG9uIGEgaG90IHN1bW1lciBkYXk/IEJlYWNoIFBhcnR5IFNlcmllcyBNaW5lci4iLCJjbiI6IldoYXQncyBiZXR0ZXIgdGhhbiBpY2UgY3JlYW0gb24gYSBob3Qgc3VtbWVyIGRheT8gQmVhY2ggUGFydHkgU2VyaWVzIE1pbmVyLiJ9LCJjcmVhdGVkX2J5X3RpdGxlIjp7ImxpbmsiOiIiLCJ0ZXh0IjoiIn0sImxldmVsIjoxLCJ0eXBlIjoibWVyZ2UiLCJmaWxlbmFtZSI6ImljZWRfb3V0X2NyZWFtIiwiaXNfY2FuX2JlX3NvbGRfb25fbXAiOnRydWUsImJvbnVzIjoyMTAsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjZlODQ3OGJhMjZjMzdjMzBmMDRkOWMyIiwiaXRlbV9pZCI6IjYzMWY3YTIyODIzOGVkMjgzYTIzNDM0YiIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjEyLCJ0eXBlIjoibWluZXIiLCJ0aXRsZSI6eyJlbiI6Ik1pbmVyIFJld2FyZCIsImNuIjoiTWluZXIgUmV3YXJkIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24ifSwiaXRlbSI6eyJfaWQiOiI2MzFmN2EyMjgyMzhlZDI4M2EyMzQzNGIiLCJwb3dlciI6OTUwMTQ1LCJ3aWR0aCI6MiwibmFtZSI6eyJlbiI6IktoZXByaSIsImNuIjoiS2hlcHJpIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTm93IHJvbGxpbmcgb25seSBjb2lucyBhbmQgbm90aGluZyBtb3JlISBUaGlzIG1pbmVyIGlzIG9uZSBvZiB0aGUgdGVuIHNlbGVjdGVkIHdpbm5lcnMgb2YgdGhlIE1pbmVycyBBcnQgQ29udGVzdDogQW5jaWVudCBNeXRocy4gQ3JlYXRlZCBieSAiLCJjbiI6Ik5vdyByb2xsaW5nIG9ubHkgY29pbnMgYW5kIG5vdGhpbmcgbW9yZSEgVGhpcyBtaW5lciBpcyBvbmUgb2YgdGhlIHRlbiBzZWxlY3RlZCB3aW5uZXJzIG9mIHRoZSBNaW5lcnMgQXJ0IENvbnRlc3Q6IEFuY2llbnQgTXl0aHMuIENyZWF0ZWQgYnkgIn0sImNyZWF0ZWRfYnlfdGl0bGUiOnsibGluayI6IiIsInRleHQiOiIifSwibGV2ZWwiOjQsInR5cGUiOiJtZXJnZSIsImZpbGVuYW1lIjoia2hlcHJpIiwiaXNfY2FuX2JlX3NvbGRfb25fbXAiOnRydWUsImJvbnVzIjozMCwiaXNfaW5fc2V0IjpmYWxzZX19LHsiaWQiOiI2NmU4NDc4YmEyNmMzN2MzMGYwNGQ5YzYiLCJpdGVtX2lkIjoiNjRkNjE3OTkzN2E5YmUwODFjMDE5ZDA0IiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MTMsInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjY0ZDYxNzk5MzdhOWJlMDgxYzAxOWQwNCIsInBvd2VyIjo5NTA5ODUsIndpZHRoIjoyLCJuYW1lIjp7ImVuIjoiTHVtaW5vdXMgUHVsc2UiLCJjbiI6Ikx1bWlub3VzIFB1bHNlIiwiZXMiOiJMdW1pbm91cyBQdWxzZSIsInB0IjoiTHVtaW5vdXMgUHVsc2UifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJFeHBlcmllbmNlIHRoZSBwdWxzYXRpbmcgZW5lcmd5IG9mIE1pYW1pJ3MgbmVvbiBuaWdodGxpZmUgd2l0aCB0aGUgTHVtaW5vdXMgUHVsc2UgTWluZXIsIGRlc2lnbmVkIHRvIGFtcGxpZnkgeW91ciBtaW5pbmcgcGVyZm9ybWFuY2UuIEJ5IExlb25hcmRvTFkiLCJjbiI6IkV4cGVyaWVuY2UgdGhlIHB1bHNhdGluZyBlbmVyZ3kgb2YgTWlhbWkncyBuZW9uIG5pZ2h0bGlmZSB3aXRoIHRoZSBMdW1pbm91cyBQdWxzZSBNaW5lciwgZGVzaWduZWQgdG8gYW1wbGlmeSB5b3VyIG1pbmluZyBwZXJmb3JtYW5jZS4gQnkgTGVvbmFyZG9MWSIsImVzIjoiRXhwZXJpZW5jZSB0aGUgcHVsc2F0aW5nIGVuZXJneSBvZiBNaWFtaSdzIG5lb24gbmlnaHRsaWZlIHdpdGggdGhlIEx1bWlub3VzIFB1bHNlIE1pbmVyLCBkZXNpZ25lZCB0byBhbXBsaWZ5IHlvdXIgbWluaW5nIHBlcmZvcm1hbmNlLiBCeSBMZW9uYXJkb0xZIiwicHQiOiJFeHBlcmllbmNlIHRoZSBwdWxzYXRpbmcgZW5lcmd5IG9mIE1pYW1pJ3MgbmVvbiBuaWdodGxpZmUgd2l0aCB0aGUgTHVtaW5vdXMgUHVsc2UgTWluZXIsIGRlc2lnbmVkIHRvIGFtcGxpZnkgeW91ciBtaW5pbmcgcGVyZm9ybWFuY2UuIEJ5IExlb25hcmRvTFkifSwiY3JlYXRlZF9ieV90aXRsZSI6eyJsaW5rIjoiIiwidGV4dCI6IiJ9LCJsZXZlbCI6MiwidHlwZSI6Im1lcmdlIiwiZmlsZW5hbWUiOiJsdW1pbm91c19wdWxzZSIsImlzX2Nhbl9iZV9zb2xkX29uX21wIjp0cnVlLCJib251cyI6MTY2LCJpc19pbl9zZXQiOmZhbHNlfX0seyJpZCI6IjY2ZTg0NzhiYTI2YzM3YzMwZjA0ZDljYSIsIml0ZW1faWQiOiI2MmJhYzY0YzliNWEzN2RiNDYyMjFkN2UiLCJhbW91bnQiOjEsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjoxNCwidHlwZSI6Im1pbmVyIiwidGl0bGUiOnsiZW4iOiJNaW5lciBSZXdhcmQiLCJjbiI6Ik1pbmVyIFJld2FyZCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIn0sIml0ZW0iOnsiX2lkIjoiNjJiYWM2NGM5YjVhMzdkYjQ2MjIxZDdlIiwibmFtZSI6eyJlbiI6IlN1Z2FyLU1lbG9uIiwiY24iOiJTdWdhci1NZWxvbiJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6IuKAnER1ZGUsIGhvdyBkbyB5b3UgZ2V0IHNvIG11Y2ggcGFzc2l2ZSBpbmNvbWU/4oCdLCDigJxPaCwganVzdCByZWNoYXJnaW5nIG15IHdhdGVybWVsb24gZnJvbSB0aW1lIHRvIHRpbWUh4oCdIiwiY24iOiLigJxEdWRlLCBob3cgZG8geW91IGdldCBzbyBtdWNoIHBhc3NpdmUgaW5jb21lP+KAnSwg4oCcT2gsIGp1c3QgcmVjaGFyZ2luZyBteSB3YXRlcm1lbG9uIGZyb20gdGltZSB0byB0aW1lIeKAnSJ9LCJwb3dlciI6NzUwMDAwLCJ3aWR0aCI6MiwibGV2ZWwiOjAsInR5cGUiOiJiYXNpYyIsImZpbGVuYW1lIjoic3VnYXJfbWVsb24iLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6dHJ1ZSwiYm9udXMiOjQwMCwiaXNfaW5fc2V0IjpmYWxzZX19LHsiaWQiOiI2NmU4NDc4YmEyNmMzN2MzMGYwNGQ5Y2UiLCJpdGVtX2lkIjoiNjZlODQ1ZDBlMGRkMzUzMGRhOTE1YmJhIiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MTUsInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjY2ZTg0NWQwZTBkZDM1MzBkYTkxNWJiYSIsInBvd2VyIjoyNTk5MDAwLCJ3aWR0aCI6MiwibmFtZSI6eyJlbiI6IlBhbG1QaWxvdCIsImNuIjoiUGFsbVBpbG90IiwiZXMiOiJQYWxtUGlsb3QiLCJwdCI6IlBhbG1QaWxvdCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6IkdsaWRlIHRocm91Z2ggY3J5cHRvIG1pbmluZyB3aXRoIFBhbG1QaWxvdCwgZWZmb3J0bGVzc2x5IGNhcHR1cmluZyBwcm9maXRzIGxpa2UgYSBjYW1lcmEgc25hcHBpbmcgYSBwZXJmZWN0IGJlYWNoIHN1bnNldC4gSXQgdHVybnMgZXZlcnkgYWxnb3JpdGhtIGludG8gYSBicmVlemUsIGRlbGl2ZXJpbmcgZ2FpbnMgYXMgcmVmcmVzaGluZyBhcyBhIHRyb3BpY2FsIGVzY2FwZS4iLCJjbiI6IkdsaWRlIHRocm91Z2ggY3J5cHRvIG1pbmluZyB3aXRoIFBhbG1QaWxvdCwgZWZmb3J0bGVzc2x5IGNhcHR1cmluZyBwcm9maXRzIGxpa2UgYSBjYW1lcmEgc25hcHBpbmcgYSBwZXJmZWN0IGJlYWNoIHN1bnNldC4gSXQgdHVybnMgZXZlcnkgYWxnb3JpdGhtIGludG8gYSBicmVlemUsIGRlbGl2ZXJpbmcgZ2FpbnMgYXMgcmVmcmVzaGluZyBhcyBhIHRyb3BpY2FsIGVzY2FwZS4iLCJlcyI6IkdsaWRlIHRocm91Z2ggY3J5cHRvIG1pbmluZyB3aXRoIFBhbG1QaWxvdCwgZWZmb3J0bGVzc2x5IGNhcHR1cmluZyBwcm9maXRzIGxpa2UgYSBjYW1lcmEgc25hcHBpbmcgYSBwZXJmZWN0IGJlYWNoIHN1bnNldC4gSXQgdHVybnMgZXZlcnkgYWxnb3JpdGhtIGludG8gYSBicmVlemUsIGRlbGl2ZXJpbmcgZ2FpbnMgYXMgcmVmcmVzaGluZyBhcyBhIHRyb3BpY2FsIGVzY2FwZS4iLCJwdCI6IkdsaWRlIHRocm91Z2ggY3J5cHRvIG1pbmluZyB3aXRoIFBhbG1QaWxvdCwgZWZmb3J0bGVzc2x5IGNhcHR1cmluZyBwcm9maXRzIGxpa2UgYSBjYW1lcmEgc25hcHBpbmcgYSBwZXJmZWN0IGJlYWNoIHN1bnNldC4gSXQgdHVybnMgZXZlcnkgYWxnb3JpdGhtIGludG8gYSBicmVlemUsIGRlbGl2ZXJpbmcgZ2FpbnMgYXMgcmVmcmVzaGluZyBhcyBhIHRyb3BpY2FsIGVzY2FwZS4ifSwiY3JlYXRlZF9ieV90aXRsZSI6eyJsaW5rIjoiIiwidGV4dCI6IiJ9LCJsZXZlbCI6MCwidHlwZSI6ImJhc2ljIiwiZmlsZW5hbWUiOiJwYWxtcGlsb3QiLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6dHJ1ZSwiYm9udXMiOjE1MCwiaXNfaW5fc2V0IjpmYWxzZX19LHsiaWQiOiI2NmU4NDc4YmEyNmMzN2MzMGYwNGQ5ZDIiLCJpdGVtX2lkIjoiNjZlODQ1ZDBlMGRkMzUzMGRhOTE1YmJkIiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MTYsInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjY2ZTg0NWQwZTBkZDM1MzBkYTkxNWJiZCIsInBvd2VyIjo2ODMwMDAwLCJ3aWR0aCI6MiwibmFtZSI6eyJlbiI6IlBhbG1QaWxvdCIsImNuIjoiUGFsbVBpbG90IiwiZXMiOiJQYWxtUGlsb3QiLCJwdCI6IlBhbG1QaWxvdCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6IkdsaWRlIHRocm91Z2ggY3J5cHRvIG1pbmluZyB3aXRoIFBhbG1QaWxvdCwgZWZmb3J0bGVzc2x5IGNhcHR1cmluZyBwcm9maXRzIGxpa2UgYSBjYW1lcmEgc25hcHBpbmcgYSBwZXJmZWN0IGJlYWNoIHN1bnNldC4gSXQgdHVybnMgZXZlcnkgYWxnb3JpdGhtIGludG8gYSBicmVlemUsIGRlbGl2ZXJpbmcgZ2FpbnMgYXMgcmVmcmVzaGluZyBhcyBhIHRyb3BpY2FsIGVzY2FwZS4iLCJjbiI6IkdsaWRlIHRocm91Z2ggY3J5cHRvIG1pbmluZyB3aXRoIFBhbG1QaWxvdCwgZWZmb3J0bGVzc2x5IGNhcHR1cmluZyBwcm9maXRzIGxpa2UgYSBjYW1lcmEgc25hcHBpbmcgYSBwZXJmZWN0IGJlYWNoIHN1bnNldC4gSXQgdHVybnMgZXZlcnkgYWxnb3JpdGhtIGludG8gYSBicmVlemUsIGRlbGl2ZXJpbmcgZ2FpbnMgYXMgcmVmcmVzaGluZyBhcyBhIHRyb3BpY2FsIGVzY2FwZS4iLCJlcyI6IkdsaWRlIHRocm91Z2ggY3J5cHRvIG1pbmluZyB3aXRoIFBhbG1QaWxvdCwgZWZmb3J0bGVzc2x5IGNhcHR1cmluZyBwcm9maXRzIGxpa2UgYSBjYW1lcmEgc25hcHBpbmcgYSBwZXJmZWN0IGJlYWNoIHN1bnNldC4gSXQgdHVybnMgZXZlcnkgYWxnb3JpdGhtIGludG8gYSBicmVlemUsIGRlbGl2ZXJpbmcgZ2FpbnMgYXMgcmVmcmVzaGluZyBhcyBhIHRyb3BpY2FsIGVzY2FwZS4iLCJwdCI6IkdsaWRlIHRocm91Z2ggY3J5cHRvIG1pbmluZyB3aXRoIFBhbG1QaWxvdCwgZWZmb3J0bGVzc2x5IGNhcHR1cmluZyBwcm9maXRzIGxpa2UgYSBjYW1lcmEgc25hcHBpbmcgYSBwZXJmZWN0IGJlYWNoIHN1bnNldC4gSXQgdHVybnMgZXZlcnkgYWxnb3JpdGhtIGludG8gYSBicmVlemUsIGRlbGl2ZXJpbmcgZ2FpbnMgYXMgcmVmcmVzaGluZyBhcyBhIHRyb3BpY2FsIGVzY2FwZS4ifSwiY3JlYXRlZF9ieV90aXRsZSI6eyJsaW5rIjoiIiwidGV4dCI6IiJ9LCJsZXZlbCI6MSwidHlwZSI6Im1lcmdlIiwiZmlsZW5hbWUiOiJwYWxtcGlsb3QiLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6dHJ1ZSwiYm9udXMiOjQ1MCwiaXNfaW5fc2V0IjpmYWxzZX19XSwibGV2ZWxzX2NvbmZpZyI6W3sibGV2ZWwiOjEsImxldmVsX3hwIjoyMDAwLCJyZXF1aXJlZF94cCI6MjAwMH0seyJsZXZlbCI6MiwibGV2ZWxfeHAiOjQwMDAsInJlcXVpcmVkX3hwIjo2MDAwfSx7ImxldmVsIjozLCJsZXZlbF94cCI6ODAwMCwicmVxdWlyZWRfeHAiOjE0MDAwfSx7ImxldmVsIjo0LCJsZXZlbF94cCI6MTYwMDAsInJlcXVpcmVkX3hwIjozMDAwMH0seyJsZXZlbCI6NSwibGV2ZWxfeHAiOjM2MDAwLCJyZXF1aXJlZF94cCI6NjYwMDB9LHsibGV2ZWwiOjYsImxldmVsX3hwIjoxMDAwMDAsInJlcXVpcmVkX3hwIjoxNjYwMDB9LHsibGV2ZWwiOjcsImxldmVsX3hwIjo0MDAwMDAsInJlcXVpcmVkX3hwIjo1NjYwMDB9LHsibGV2ZWwiOjgsImxldmVsX3hwIjo1NTAwMDAsInJlcXVpcmVkX3hwIjoxMTE2MDAwfSx7ImxldmVsIjo5LCJsZXZlbF94cCI6NjkwMDAwLCJyZXF1aXJlZF94cCI6MTgwNjAwMH0seyJsZXZlbCI6MTAsImxldmVsX3hwIjo4MTAwMDAsInJlcXVpcmVkX3hwIjoyNjE2MDAwfSx7ImxldmVsIjoxMSwibGV2ZWxfeHAiOjkzMDAwMCwicmVxdWlyZWRfeHAiOjM1NDYwMDB9LHsibGV2ZWwiOjEyLCJsZXZlbF94cCI6MTAwMDAwMCwicmVxdWlyZWRfeHAiOjQ1NDYwMDB9LHsibGV2ZWwiOjEzLCJsZXZlbF94cCI6MTIwMDAwMCwicmVxdWlyZWRfeHAiOjU3NDYwMDB9LHsibGV2ZWwiOjE0LCJsZXZlbF94cCI6MTUwMDAwMCwicmVxdWlyZWRfeHAiOjcyNDYwMDB9LHsibGV2ZWwiOjE1LCJsZXZlbF94cCI6MzAwMDAwMCwicmVxdWlyZWRfeHAiOjEwMjQ2MDAwfSx7ImxldmVsIjoxNiwibGV2ZWxfeHAiOjUwMDAwMDAsInJlcXVpcmVkX3hwIjoxNTI0NjAwMH1dfQ==";

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

// Decodifica a string BASE64 
const decodedString = atob(base64String);
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
        case 0: return "Comum";
        case 1: return "Incomum";
        case 2: return "Rara";
        case 3: return "Épica";
        case 4: return "Lendária";
        case 5: return "Unreal";
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
    cellXP.textContent = cellXPValue || '-';
    row.appendChild(cellXP);

    let cellTotalXP = document.createElement('td');
    cellTotalXP.textContent = Math.floor(totalXP); // Remove as casas decimais
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

        // Cria a imagem para o minerador
        let minerImage = document.createElement('img');
        minerImage.src = imageURL;
        minerImage.alt = item.name.en;
        minerImage.style.width = '50px'; // Define o tamanho da imagem
        minerImage.style.height = 'auto'; // Mantém a proporção da altura

        // Adiciona a imagem ao container da imagem
        imageContainer.appendChild(minerImage);

        // Cria o texto para o nível e nome do item
        let itemDetails = document.createElement('span');
        let levelName = levelToName(item.level); // Converte o nível para nome
        itemDetails.textContent = `${item.name?.en} ${levelName}`;

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

        // Construa a URL da imagem do minerador
        const baseURL = "https://static.rollercoin.com/static/img/market/racks/";
        const filename = item._id;
        const imageURL = `${baseURL}${filename}.png`;

        // Cria a imagem para o minerador
        let minerImage = document.createElement('img');
        minerImage.src = imageURL;
        minerImage.alt = item.name.en;
        minerImage.style.width = '50px'; // Define o tamanho da imagem
        minerImage.style.height = 'auto'; // Mantém a proporção da altura

        // Adiciona a imagem ao container da imagem
        imageContainer.appendChild(minerImage);

        // Cria o texto para o nome do item
        let itemDetails = document.createElement('span');
        itemDetails.textContent = `${item.name?.en}`;

        // Adiciona o texto ao container de texto
        textContainer.appendChild(itemDetails);

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
