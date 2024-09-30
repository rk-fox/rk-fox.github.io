// Substitua esta string pelo seu código BASE64
const base64String = "eyJldmVudCI6eyJfaWQiOiI2NmZhODAwMGUwZGQzNTMwZGFiMTVjNzciLCJtYXhfeHAiOjgxOTgwMDAsIm1heF9tdWx0aXBsaWVyIjoxMDAwMCwibWF4X2xldmVsIjoxNSwicHJvZ3Jlc3Npb25fZXZlbnRfdHlwZSI6ImRlZmF1bHQiLCJlbmRfZGF0ZSI6IjIwMjQtMTAtMDJUMTQ6NTk6MDAuMDAwWiIsImxhc3RfdXBkYXRlZCI6MTcyNzY5MjgwMDQ1MCwiZGVzY3JpcHRpb24iOnsiZW4iOiJbMzDigJMwMl0gSGF5IGRheSIsImNuIjoiWzMw4oCTMDJdIEhheSBkYXkifSwidGl0bGUiOnsiZW4iOiJIYXkgZGF5IiwiY24iOiJIYXkgZGF5In19LCJyZXdhcmRzIjpbeyJpZCI6IjY2ZmE4MDAwYTI2YzM3YzMwZmY5YmQzNiIsIml0ZW1faWQiOm51bGwsImFtb3VudCI6MTAwMDAwLCJjdXJyZW5jeSI6IlJMVCIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MSwidHlwZSI6Im1vbmV5IiwidGl0bGUiOnsiZW4iOiJNb25leSBUaXRsZSIsImNuIjoiTW9uZXkgVGl0bGUifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNb25leSBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1vbmV5IFJld2FyZCBEZXNjcmlwdGlvbiJ9fSx7ImlkIjoiNjZmYTgwMDBhMjZjMzdjMzBmZjliZDNhIiwiaXRlbV9pZCI6bnVsbCwiYW1vdW50IjoxMDAwMDAwMDAsImN1cnJlbmN5IjoiUlNUIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjoyLCJ0eXBlIjoibW9uZXkiLCJ0aXRsZSI6eyJlbiI6Ik1vbmV5IFRpdGxlIiwiY24iOiJNb25leSBUaXRsZSJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6Ik1vbmV5IFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiTW9uZXkgUmV3YXJkIERlc2NyaXB0aW9uIn19LHsiaWQiOiI2NmZhODAwMGEyNmMzN2MzMGZmOWJkM2UiLCJpdGVtX2lkIjpudWxsLCJhbW91bnQiOjEwMDAwMDAsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjYwNDgwMDAwMCwicmVxdWlyZWRfbGV2ZWwiOjMsInR5cGUiOiJwb3dlciIsInRpdGxlIjp7ImVuIjoiUG93ZXIiLCJjbiI6IlBvd2VyIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiUG93ZXIgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJQb3dlciBSZXdhcmQgRGVzY3JpcHRpb24ifX0seyJpZCI6IjY2ZmE4MDAwYTI2YzM3YzMwZmY5YmQ0MiIsIml0ZW1faWQiOiI1YTBiMDhiMWQxZDllZTU4OTRmMzZmMzMiLCJhbW91bnQiOjEsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjo0LCJ0eXBlIjoibWluZXIiLCJ0aXRsZSI6eyJlbiI6Ik1pbmVyIFJld2FyZCIsImNuIjoiTWluZXIgUmV3YXJkIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24ifSwiaXRlbSI6eyJfaWQiOiI1YTBiMDhiMWQxZDllZTU4OTRmMzZmMzMiLCJwb3dlciI6MTYwMDAsIndpZHRoIjoyLCJkZXNjcmlwdGlvbiI6eyJlbiI6Ikl04oCZcyBub3QgZW5vdWdoIGZvciB5b3UgdG8gcGxheSB3aXRoIHRoZSBiaWcgYm95cyBidXQgeW91IHdhbnQgdG8ga2ljayBhc3M/IFRoYW4gdGhpcyBzaG91bGQgYmUgdGhlIGxlYXN0IHlvdSBjYW4gc3RhcnQgd2l0aC4iLCJjbiI6IuinieW+l+WfuuacrOefv+acuuS4jeWkn+WKm+S6humCo+i/meaYr+esrOS6jOmAieaLqeOAgiIsImVzIjoiSXTigJlzIG5vdCBlbm91Z2ggZm9yIHlvdSB0byBwbGF5IHdpdGggdGhlIGJpZyBib3lzIGJ1dCB5b3Ugd2FudCB0byBraWNrIGFzcz8gVGhhbiB0aGlzIHNob3VsZCBiZSB0aGUgbGVhc3QgeW91IGNhbiBzdGFydCB3aXRoLiIsInB0IjoiSXTigJlzIG5vdCBlbm91Z2ggZm9yIHlvdSB0byBwbGF5IHdpdGggdGhlIGJpZyBib3lzIGJ1dCB5b3Ugd2FudCB0byBraWNrIGFzcz8gVGhhbiB0aGlzIHNob3VsZCBiZSB0aGUgbGVhc3QgeW91IGNhbiBzdGFydCB3aXRoLiJ9LCJuYW1lIjp7ImVuIjoiRHJhZ29ucm9sbGVyIDE2VCIsImNuIjoiRHJhZ29ucm9sbGVyIDE2VCIsImVzIjoiRHJhZ29ucm9sbGVyIDE2VCIsInB0IjoiRHJhZ29ucm9sbGVyIDE2VCJ9LCJsZXZlbCI6MCwidHlwZSI6ImJhc2ljIiwiZmlsZW5hbWUiOiJkcmFnb25yb2xsZXJfMTZ0IiwiaXNfY2FuX2JlX3NvbGRfb25fbXAiOmZhbHNlLCJjcmVhdGVkX2J5X3RpdGxlIjp7ImxpbmsiOiIiLCJ0ZXh0IjoiIn0sImJvbnVzIjoxMDAsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjZmYTgwMDBhMjZjMzdjMzBmZjliZDQ2IiwiaXRlbV9pZCI6IjYxMGE5YzE5YmY2YjUzNzQ0YzhkMDg1YiIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjUsInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjYxMGE5YzE5YmY2YjUzNzQ0YzhkMDg1YiIsInBvd2VyIjozODAwMCwid2lkdGgiOjIsIm5hbWUiOnsiZW4iOiJUWVBFLVoiLCJjbiI6IlRZUEUtWiIsImVzIjoiVFlQRS1aIiwicHQiOiJUWVBFLVoifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJSZWxpYWJsZSBhbmQgYWZmb3JkYWJsZSBtaW5lciB3aXRoIGdyZWF0IGNvc3QtZWZmaWNpZW5jeS4gT25seSBhdmFpbGFibGUgZm9yIHB1cmNoYXNlIGluIFdlZWtseSBPZmZlcnMgZXhjbHVzaXZlbHkuIiwiY24iOiJSZWxpYWJsZSBhbmQgYWZmb3JkYWJsZSBtaW5lciB3aXRoIGdyZWF0IGNvc3QtZWZmaWNpZW5jeS4gT25seSBhdmFpbGFibGUgZm9yIHB1cmNoYXNlIGluIFdlZWtseSBPZmZlcnMgZXhjbHVzaXZlbHkuIiwiZXMiOiJSZWxpYWJsZSBhbmQgYWZmb3JkYWJsZSBtaW5lciB3aXRoIGdyZWF0IGNvc3QtZWZmaWNpZW5jeS4gT25seSBhdmFpbGFibGUgZm9yIHB1cmNoYXNlIGluIFdlZWtseSBPZmZlcnMgZXhjbHVzaXZlbHkuIiwicHQiOiJSZWxpYWJsZSBhbmQgYWZmb3JkYWJsZSBtaW5lciB3aXRoIGdyZWF0IGNvc3QtZWZmaWNpZW5jeS4gT25seSBhdmFpbGFibGUgZm9yIHB1cmNoYXNlIGluIFdlZWtseSBPZmZlcnMgZXhjbHVzaXZlbHkuIn0sImxldmVsIjowLCJ0eXBlIjoiYmFzaWMiLCJmaWxlbmFtZSI6InR5cGVfeiIsImlzX2Nhbl9iZV9zb2xkX29uX21wIjpmYWxzZSwiY3JlYXRlZF9ieV90aXRsZSI6eyJsaW5rIjoiIiwidGV4dCI6IiJ9LCJib251cyI6MTAwLCJpc19pbl9zZXQiOmZhbHNlfX0seyJpZCI6IjY2ZmE4MDAwYTI2YzM3YzMwZmY5YmQ0YSIsIml0ZW1faWQiOiI2MzFmNzkwMTgyMzhlZDI4M2EyMzM1ZmQiLCJhbW91bnQiOjEsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjo2LCJ0eXBlIjoibWluZXIiLCJ0aXRsZSI6eyJlbiI6Ik1pbmVyIFJld2FyZCIsImNuIjoiTWluZXIgUmV3YXJkIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24ifSwiaXRlbSI6eyJfaWQiOiI2MzFmNzkwMTgyMzhlZDI4M2EyMzM1ZmQiLCJwb3dlciI6MTY1Mzc1LCJ3aWR0aCI6MSwibmFtZSI6eyJlbiI6IlRoZSBMdXNoIiwiY24iOiJUaGUgTHVzaCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6Ik5ldmVyIGV4cGVjdGVkIGEgd2VpcmQgYnVzaCB0byBtaW5lIGNvaW5zLCBodWgsIG15IHN3ZWV0IHN1bW1lciBjaGlsZD8gQ2F1dGlvbjogZG8gbm90IHdhdGVyLiIsImNuIjoiTmV2ZXIgZXhwZWN0ZWQgYSB3ZWlyZCBidXNoIHRvIG1pbmUgY29pbnMsIGh1aCwgbXkgc3dlZXQgc3VtbWVyIGNoaWxkPyBDYXV0aW9uOiBkbyBub3Qgd2F0ZXIuIn0sImNyZWF0ZWRfYnlfdGl0bGUiOnsibGluayI6IiIsInRleHQiOiIifSwibGV2ZWwiOjIsInR5cGUiOiJtZXJnZSIsImZpbGVuYW1lIjoidGhlX2x1c2giLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6dHJ1ZSwiYm9udXMiOjU1LCJpc19pbl9zZXQiOmZhbHNlfX0seyJpZCI6IjY2ZmE4MDAwYTI2YzM3YzMwZmY5YmQ0ZSIsIml0ZW1faWQiOm51bGwsImFtb3VudCI6MjUwMDAwMDAwLCJjdXJyZW5jeSI6IlJTVCIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6NywidHlwZSI6Im1vbmV5IiwidGl0bGUiOnsiZW4iOiJNb25leSBUaXRsZSIsImNuIjoiTW9uZXkgVGl0bGUifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNb25leSBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1vbmV5IFJld2FyZCBEZXNjcmlwdGlvbiJ9fSx7ImlkIjoiNjZmYTgwMDBhMjZjMzdjMzBmZjliZDU1IiwiaXRlbV9pZCI6IjYzMWY3ODllODIzOGVkMjgzYTIzMzE2YiIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjgsInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjYzMWY3ODllODIzOGVkMjgzYTIzMzE2YiIsInBvd2VyIjoyMDY3NDUsIndpZHRoIjoyLCJuYW1lIjp7ImVuIjoiU2VyZW5pdHkiLCJjbiI6IlNlcmVuaXR5In0sImRlc2NyaXB0aW9uIjp7ImVuIjoiQSB3YXZlIG9mIHBsZWFzYW50IEV0aGVyIHlvdSBjYW4gZmVlbC4gU2VyZW5pdHksIGNvbWZvcnQuIEtlZXAgY2FsbSBhbmQgbWluZSBpdCEiLCJjbiI6IkEgd2F2ZSBvZiBwbGVhc2FudCBFdGhlciB5b3UgY2FuIGZlZWwuIFNlcmVuaXR5LCBjb21mb3J0LiBLZWVwIGNhbG0gYW5kIG1pbmUgaXQhIn0sImNyZWF0ZWRfYnlfdGl0bGUiOnsibGluayI6IiIsInRleHQiOiIifSwibGV2ZWwiOjIsInR5cGUiOiJtZXJnZSIsImZpbGVuYW1lIjoic2VyZW5pdHkiLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6dHJ1ZSwiYm9udXMiOjExMCwiaXNfaW5fc2V0IjpmYWxzZX19LHsiaWQiOiI2NmZhODAwMGEyNmMzN2MzMGZmOWJkNTkiLCJpdGVtX2lkIjpudWxsLCJhbW91bnQiOjUwMDAwMDAwMCwiY3VycmVuY3kiOiJSU1QiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjksInR5cGUiOiJtb25leSIsInRpdGxlIjp7ImVuIjoiTW9uZXkgVGl0bGUiLCJjbiI6Ik1vbmV5IFRpdGxlIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTW9uZXkgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNb25leSBSZXdhcmQgRGVzY3JpcHRpb24ifX0seyJpZCI6IjY2ZmE4MDAwYTI2YzM3YzMwZmY5YmQ1ZCIsIml0ZW1faWQiOiI2MTUzMjE0NmRiNTAwODEwMmY5Zjc3ZTYiLCJhbW91bnQiOjEsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjoxMCwidHlwZSI6Im1pbmVyIiwidGl0bGUiOnsiZW4iOiJNaW5lciBSZXdhcmQiLCJjbiI6Ik1pbmVyIFJld2FyZCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIn0sIml0ZW0iOnsiX2lkIjoiNjE1MzIxNDZkYjUwMDgxMDJmOWY3N2U2IiwibmFtZSI6eyJlbiI6IkNhbmR5c3dlZXQiLCJjbiI6IkNhbmR5c3dlZXQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJXaGF0IGlzIHRoYXQgdGFzdGU/IEl0IGlzIHNoaW55LCByb3VuZCBhbmQgdmVyeSBzd2VldC4gSXMgdGhhdCBhIGNhbmR5LCBvciBhIEJpdGNvaW4gb24geW91ciB0b25ndWU/IiwiY24iOiJXaGF0IGlzIHRoYXQgdGFzdGU/IEl0IGlzIHNoaW55LCByb3VuZCBhbmQgdmVyeSBzd2VldC4gSXMgdGhhdCBhIGNhbmR5LCBvciBhIEJpdGNvaW4gb24geW91ciB0b25ndWU/In0sInBvd2VyIjoyNTAwMDAsIndpZHRoIjoyLCJsZXZlbCI6MCwidHlwZSI6ImJhc2ljIiwiZmlsZW5hbWUiOiJjYW5keXN3ZWV0IiwiaXNfY2FuX2JlX3NvbGRfb25fbXAiOnRydWUsImJvbnVzIjo0MDAsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjZmYTgwMDBhMjZjMzdjMzBmZjliZDYxIiwiaXRlbV9pZCI6IjYwYzc0NDRjNjVkY2U4NmM4NjYxYTJhZiIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjExLCJ0eXBlIjoibWluZXIiLCJ0aXRsZSI6eyJlbiI6Ik1pbmVyIFJld2FyZCIsImNuIjoiTWluZXIgUmV3YXJkIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24ifSwiaXRlbSI6eyJfaWQiOiI2MGM3NDQ0YzY1ZGNlODZjODY2MWEyYWYiLCJwb3dlciI6NDAwMDAwLCJ3aWR0aCI6MiwibmFtZSI6eyJlbiI6IlBlcmZlY3Rpb24iLCJjbiI6IlBlcmZlY3Rpb24iLCJlcyI6IlBlcmZlY3Rpb24iLCJwdCI6IlBlcmZlY3Rpb24ifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJUaGUgUEVSRkVDVElPTiBpcyBidWlsdCBkaWZmZXJlbnQuIExpa2UgY2xvY2t3b3JrLCBpdOKAmXMgbWFkZSBvZiB0aGUgZmluZXN0IG1hdGVyaWFscyBhbmQgcmVhZHkgZm9yIHRoZSBuZXh0IGxldmVsIG9mIGNyeXB0byBtaW5pbmcuIFBlcmZlY3Rpb24gU2VyaWVzIE1pbmVyLiIsImNuIjoiUEVSRkVDVElPTiDnmoTmnoTpgKDkuI7kvJfkuI3lkIzlsLHlg4/lj5HmnaHkuIDmoLfvvIzlroPnlLHmnIDlpb3nmoTmnZDmlpnmiJDkuLrkuIvkuIDkuKrnuqfliKvnmoTliqDlr4bmjJbmjpjlgZrlpb3kuoblh4blpIfjgIIgUGVyZmVjdGlvbiBTZXJpZXMgTWluZXLjgIIiLCJlcyI6IlRoZSBQRVJGRUNUSU9OIGlzIGJ1aWx0IGRpZmZlcmVudC4gTGlrZSBjbG9ja3dvcmssIGl04oCZcyBtYWRlIG9mIHRoZSBmaW5lc3QgbWF0ZXJpYWxzIGFuZCByZWFkeSBmb3IgdGhlIG5leHQgbGV2ZWwgb2YgY3J5cHRvIG1pbmluZy4gUGVyZmVjdGlvbiBTZXJpZXMgTWluZXIuIiwicHQiOiJUaGUgUEVSRkVDVElPTiBpcyBidWlsdCBkaWZmZXJlbnQuIExpa2UgY2xvY2t3b3JrLCBpdOKAmXMgbWFkZSBvZiB0aGUgZmluZXN0IG1hdGVyaWFscyBhbmQgcmVhZHkgZm9yIHRoZSBuZXh0IGxldmVsIG9mIGNyeXB0byBtaW5pbmcuIFBlcmZlY3Rpb24gU2VyaWVzIE1pbmVyLiJ9LCJsZXZlbCI6MCwidHlwZSI6ImJhc2ljIiwiZmlsZW5hbWUiOiJwZXJmZWN0aW9uIiwiaXNfY2FuX2JlX3NvbGRfb25fbXAiOmZhbHNlLCJjcmVhdGVkX2J5X3RpdGxlIjp7ImxpbmsiOiIiLCJ0ZXh0IjoiIn0sImJvbnVzIjozMDAsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjZmYTgwMDBhMjZjMzdjMzBmZjliZDY1IiwiaXRlbV9pZCI6IjY1ZmQ2NGRlOGI5MGU0NTM4ZmY0YTE1MyIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjEyLCJ0eXBlIjoibWluZXIiLCJ0aXRsZSI6eyJlbiI6Ik1pbmVyIFJld2FyZCIsImNuIjoiTWluZXIgUmV3YXJkIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24ifSwiaXRlbSI6eyJfaWQiOiI2NWZkNjRkZThiOTBlNDUzOGZmNGExNTMiLCJwb3dlciI6NDU0ODYwLCJ3aWR0aCI6MiwibmFtZSI6eyJlbiI6IkJlYXN0IEJ1cnN0aW5nIiwiY24iOiJCZWFzdCBCdXJzdGluZyIsImVzIjoiQmVhc3QgQnVyc3RpbmciLCJwdCI6IkJlYXN0IEJ1cnN0aW5nIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiV2hlbiB0aGlzIG1pbmVyIHJvYXJzIHRvIGxpZmUsIGl0J3Mgbm90IGp1c3QgbWluaW5nIGNyeXB0bzsgaXQncyB0ZWFyaW5nIHRocm91Z2ggZGlnaXRhbCBibG9ja3MgbGlrZSBhIGJlYXN0IHRocm91Z2ggYSBidWZmZXQsIGdvYmJsaW5nIHVwIGNvaW5zIHdpdGggYSBmZXJvY2l0eSB0aGF0IG1ha2VzIHRoZSBpbnRlcm5ldCB0cmVtYmxlISIsImNuIjoiV2hlbiB0aGlzIG1pbmVyIHJvYXJzIHRvIGxpZmUsIGl0J3Mgbm90IGp1c3QgbWluaW5nIGNyeXB0bzsgaXQncyB0ZWFyaW5nIHRocm91Z2ggZGlnaXRhbCBibG9ja3MgbGlrZSBhIGJlYXN0IHRocm91Z2ggYSBidWZmZXQsIGdvYmJsaW5nIHVwIGNvaW5zIHdpdGggYSBmZXJvY2l0eSB0aGF0IG1ha2VzIHRoZSBpbnRlcm5ldCB0cmVtYmxlISIsImVzIjoiV2hlbiB0aGlzIG1pbmVyIHJvYXJzIHRvIGxpZmUsIGl0J3Mgbm90IGp1c3QgbWluaW5nIGNyeXB0bzsgaXQncyB0ZWFyaW5nIHRocm91Z2ggZGlnaXRhbCBibG9ja3MgbGlrZSBhIGJlYXN0IHRocm91Z2ggYSBidWZmZXQsIGdvYmJsaW5nIHVwIGNvaW5zIHdpdGggYSBmZXJvY2l0eSB0aGF0IG1ha2VzIHRoZSBpbnRlcm5ldCB0cmVtYmxlISIsInB0IjoiV2hlbiB0aGlzIG1pbmVyIHJvYXJzIHRvIGxpZmUsIGl0J3Mgbm90IGp1c3QgbWluaW5nIGNyeXB0bzsgaXQncyB0ZWFyaW5nIHRocm91Z2ggZGlnaXRhbCBibG9ja3MgbGlrZSBhIGJlYXN0IHRocm91Z2ggYSBidWZmZXQsIGdvYmJsaW5nIHVwIGNvaW5zIHdpdGggYSBmZXJvY2l0eSB0aGF0IG1ha2VzIHRoZSBpbnRlcm5ldCB0cmVtYmxlISJ9LCJjcmVhdGVkX2J5X3RpdGxlIjp7ImxpbmsiOiIiLCJ0ZXh0IjoiIn0sImxldmVsIjoyLCJ0eXBlIjoibWVyZ2UiLCJmaWxlbmFtZSI6ImJlYXN0X2J1cnN0aW5nIiwiaXNfY2FuX2JlX3NvbGRfb25fbXAiOnRydWUsImJvbnVzIjoyMTgsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjZmYTgwMDBhMjZjMzdjMzBmZjliZDY5IiwiaXRlbV9pZCI6IjY1N2MyY2RkODExMmYyZjlhMzYwYmU2MiIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjEzLCJ0eXBlIjoibWluZXIiLCJ0aXRsZSI6eyJlbiI6Ik1pbmVyIFJld2FyZCIsImNuIjoiTWluZXIgUmV3YXJkIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24ifSwiaXRlbSI6eyJfaWQiOiI2NTdjMmNkZDgxMTJmMmY5YTM2MGJlNjIiLCJwb3dlciI6NjgyMDAwLCJ3aWR0aCI6MiwibmFtZSI6eyJlbiI6IkNvenlGYWJsZXMiLCJjbiI6IkNvenlGYWJsZXMiLCJlcyI6IkNvenlGYWJsZXMiLCJwdCI6IkNvenlGYWJsZXMifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJJbiB0aGUgY296eSBub29rIG9mIENvenlGYWJsZXMsIGV2ZXJ5IG1pbmluZyBzZXNzaW9uIGlzIGEgZmFtaWx5IGNlbGVicmF0aW9uLiBCeSBaYW5naWZmIiwiY24iOiJJbiB0aGUgY296eSBub29rIG9mIENvenlGYWJsZXMsIGV2ZXJ5IG1pbmluZyBzZXNzaW9uIGlzIGEgZmFtaWx5IGNlbGVicmF0aW9uLiBCeSBaYW5naWZmIiwiZXMiOiJJbiB0aGUgY296eSBub29rIG9mIENvenlGYWJsZXMsIGV2ZXJ5IG1pbmluZyBzZXNzaW9uIGlzIGEgZmFtaWx5IGNlbGVicmF0aW9uLiBCeSBaYW5naWZmIiwicHQiOiJJbiB0aGUgY296eSBub29rIG9mIENvenlGYWJsZXMsIGV2ZXJ5IG1pbmluZyBzZXNzaW9uIGlzIGEgZmFtaWx5IGNlbGVicmF0aW9uLiBCeSBaYW5naWZmIn0sImNyZWF0ZWRfYnlfdGl0bGUiOnsibGluayI6IiIsInRleHQiOiIifSwibGV2ZWwiOjAsInR5cGUiOiJiYXNpYyIsImZpbGVuYW1lIjoiY296eWZhYmxlcyIsImlzX2Nhbl9iZV9zb2xkX29uX21wIjp0cnVlLCJib251cyI6NTAwLCJpc19pbl9zZXQiOmZhbHNlfX0seyJpZCI6IjY2ZmE4MDAwYTI2YzM3YzMwZmY5YmQ2ZCIsIml0ZW1faWQiOiI2Njg2ODAyYTc2NDM4MTUyMzJkMjIzYTciLCJhbW91bnQiOjEsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjoxNCwidHlwZSI6Im1pbmVyIiwidGl0bGUiOnsiZW4iOiJNaW5lciBSZXdhcmQiLCJjbiI6Ik1pbmVyIFJld2FyZCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIn0sIml0ZW0iOnsiX2lkIjoiNjY4NjgwMmE3NjQzODE1MjMyZDIyM2E3IiwicG93ZXIiOjcwNDAwMCwid2lkdGgiOjIsIm5hbWUiOnsiZW4iOiJBbWVyaWNhbkRyZWFtIiwiY24iOiJBbWVyaWNhbkRyZWFtIiwiZXMiOiJBbWVyaWNhbkRyZWFtIiwicHQiOiJBbWVyaWNhbkRyZWFtIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiQW1lcmljYW5EcmVhbSBNaW5lciBpcyB5b3VyIHVsdGltYXRlIGNyeXB0by1taW5pbmcgYWR2ZW50dXJlISBQaWN0dXJlIHlvdXIgcHJvZml0cyBzb2FyaW5nIGxpa2UgYSBoYW1zdGVyIG9uIGEgd2hlZWwsIHRpcmVsZXNzbHkgd29ya2luZyB0byBhY2hpZXZlIHRoZSBBbWVyaWNhbiBEcmVhbS4gRGl2ZSBpbnRvIGVhc3ksIGVmZmljaWVudCwgYW5kIHByb2ZpdGFibGUgY3J5cHRvLW1pbmluZyBzb2x1dGlvbnMsIGFuZCB3YXRjaCB5b3VyIGZpbmFuY2lhbCBkcmVhbXMgYmVjb21lIGEgcmVhbGl0eS4gSm9pbiB0aGUgcmV2b2x1dGlvbiBhbmQgc3RhcnQgbWluaW5nIGxpa2UgYSBoYW1zdGVyIGNoYXNpbmcgaXRzIGRyZWFtcyB0b2RheSEiLCJjbiI6IkFtZXJpY2FuRHJlYW0gTWluZXIgaXMgeW91ciB1bHRpbWF0ZSBjcnlwdG8tbWluaW5nIGFkdmVudHVyZSEgUGljdHVyZSB5b3VyIHByb2ZpdHMgc29hcmluZyBsaWtlIGEgaGFtc3RlciBvbiBhIHdoZWVsLCB0aXJlbGVzc2x5IHdvcmtpbmcgdG8gYWNoaWV2ZSB0aGUgQW1lcmljYW4gRHJlYW0uIERpdmUgaW50byBlYXN5LCBlZmZpY2llbnQsIGFuZCBwcm9maXRhYmxlIGNyeXB0by1taW5pbmcgc29sdXRpb25zLCBhbmQgd2F0Y2ggeW91ciBmaW5hbmNpYWwgZHJlYW1zIGJlY29tZSBhIHJlYWxpdHkuIEpvaW4gdGhlIHJldm9sdXRpb24gYW5kIHN0YXJ0IG1pbmluZyBsaWtlIGEgaGFtc3RlciBjaGFzaW5nIGl0cyBkcmVhbXMgdG9kYXkhIiwiZXMiOiJBbWVyaWNhbkRyZWFtIE1pbmVyIGlzIHlvdXIgdWx0aW1hdGUgY3J5cHRvLW1pbmluZyBhZHZlbnR1cmUhIFBpY3R1cmUgeW91ciBwcm9maXRzIHNvYXJpbmcgbGlrZSBhIGhhbXN0ZXIgb24gYSB3aGVlbCwgdGlyZWxlc3NseSB3b3JraW5nIHRvIGFjaGlldmUgdGhlIEFtZXJpY2FuIERyZWFtLiBEaXZlIGludG8gZWFzeSwgZWZmaWNpZW50LCBhbmQgcHJvZml0YWJsZSBjcnlwdG8tbWluaW5nIHNvbHV0aW9ucywgYW5kIHdhdGNoIHlvdXIgZmluYW5jaWFsIGRyZWFtcyBiZWNvbWUgYSByZWFsaXR5LiBKb2luIHRoZSByZXZvbHV0aW9uIGFuZCBzdGFydCBtaW5pbmcgbGlrZSBhIGhhbXN0ZXIgY2hhc2luZyBpdHMgZHJlYW1zIHRvZGF5ISIsInB0IjoiQW1lcmljYW5EcmVhbSBNaW5lciBpcyB5b3VyIHVsdGltYXRlIGNyeXB0by1taW5pbmcgYWR2ZW50dXJlISBQaWN0dXJlIHlvdXIgcHJvZml0cyBzb2FyaW5nIGxpa2UgYSBoYW1zdGVyIG9uIGEgd2hlZWwsIHRpcmVsZXNzbHkgd29ya2luZyB0byBhY2hpZXZlIHRoZSBBbWVyaWNhbiBEcmVhbS4gRGl2ZSBpbnRvIGVhc3ksIGVmZmljaWVudCwgYW5kIHByb2ZpdGFibGUgY3J5cHRvLW1pbmluZyBzb2x1dGlvbnMsIGFuZCB3YXRjaCB5b3VyIGZpbmFuY2lhbCBkcmVhbXMgYmVjb21lIGEgcmVhbGl0eS4gSm9pbiB0aGUgcmV2b2x1dGlvbiBhbmQgc3RhcnQgbWluaW5nIGxpa2UgYSBoYW1zdGVyIGNoYXNpbmcgaXRzIGRyZWFtcyB0b2RheSEifSwiY3JlYXRlZF9ieV90aXRsZSI6eyJsaW5rIjoiIiwidGV4dCI6IiJ9LCJsZXZlbCI6MCwidHlwZSI6ImJhc2ljIiwiZmlsZW5hbWUiOiJhbWVyaWNhbmRyZWFtIiwiaXNfY2FuX2JlX3NvbGRfb25fbXAiOnRydWUsImJvbnVzIjo0MDAsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjZmYTgwMDBhMjZjMzdjMzBmZjliZDcxIiwiaXRlbV9pZCI6IjY2ZmE3ZWY2ZTBkZDM1MzBkYWIxNWFkYSIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjE1LCJ0eXBlIjoibWluZXIiLCJ0aXRsZSI6eyJlbiI6Ik1pbmVyIFJld2FyZCIsImNuIjoiTWluZXIgUmV3YXJkIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24ifSwiaXRlbSI6eyJfaWQiOiI2NmZhN2VmNmUwZGQzNTMwZGFiMTVhZGEiLCJwb3dlciI6NjUwMDAwMCwid2lkdGgiOjIsIm5hbWUiOnsiZW4iOiJUaGUgQ2FjdHVzIiwiY24iOiJUaGUgQ2FjdHVzIiwiZXMiOiJUaGUgQ2FjdHVzIiwicHQiOiJUaGUgQ2FjdHVzIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiU29tZXRpbWVzIGFsbCB5b3UgbmVlZCBpcyBqdXN0IGEgQ2FjdHVzLiIsImNuIjoiU29tZXRpbWVzIGFsbCB5b3UgbmVlZCBpcyBqdXN0IGEgQ2FjdHVzLiIsImVzIjoiU29tZXRpbWVzIGFsbCB5b3UgbmVlZCBpcyBqdXN0IGEgQ2FjdHVzLiIsInB0IjoiU29tZXRpbWVzIGFsbCB5b3UgbmVlZCBpcyBqdXN0IGEgQ2FjdHVzLiJ9LCJjcmVhdGVkX2J5X3RpdGxlIjp7ImxpbmsiOiIiLCJ0ZXh0IjoiIn0sImxldmVsIjowLCJ0eXBlIjoiYmFzaWMiLCJmaWxlbmFtZSI6InRoZV9jYWN0dXMiLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6dHJ1ZSwiYm9udXMiOjQ1MCwiaXNfaW5fc2V0IjpmYWxzZX19XSwibGV2ZWxzX2NvbmZpZyI6W3sibGV2ZWwiOjEsImxldmVsX3hwIjoxMDAwLCJyZXF1aXJlZF94cCI6MTAwMH0seyJsZXZlbCI6MiwibGV2ZWxfeHAiOjIwMDAsInJlcXVpcmVkX3hwIjozMDAwfSx7ImxldmVsIjozLCJsZXZlbF94cCI6NTAwMCwicmVxdWlyZWRfeHAiOjgwMDB9LHsibGV2ZWwiOjQsImxldmVsX3hwIjoxMDAwMCwicmVxdWlyZWRfeHAiOjE4MDAwfSx7ImxldmVsIjo1LCJsZXZlbF94cCI6MTUwMDAsInJlcXVpcmVkX3hwIjozMzAwMH0seyJsZXZlbCI6NiwibGV2ZWxfeHAiOjQ1MDAwLCJyZXF1aXJlZF94cCI6NzgwMDB9LHsibGV2ZWwiOjcsImxldmVsX3hwIjo2MDAwMCwicmVxdWlyZWRfeHAiOjEzODAwMH0seyJsZXZlbCI6OCwibGV2ZWxfeHAiOjgwMDAwLCJyZXF1aXJlZF94cCI6MjE4MDAwfSx7ImxldmVsIjo5LCJsZXZlbF94cCI6MTIwMDAwLCJyZXF1aXJlZF94cCI6MzM4MDAwfSx7ImxldmVsIjoxMCwibGV2ZWxfeHAiOjI1MDAwMCwicmVxdWlyZWRfeHAiOjU4ODAwMH0seyJsZXZlbCI6MTEsImxldmVsX3hwIjozNjAwMDAsInJlcXVpcmVkX3hwIjo5NDgwMDB9LHsibGV2ZWwiOjEyLCJsZXZlbF94cCI6NTAwMDAwLCJyZXF1aXJlZF94cCI6MTQ0ODAwMH0seyJsZXZlbCI6MTMsImxldmVsX3hwIjo3NTAwMDAsInJlcXVpcmVkX3hwIjoyMTk4MDAwfSx7ImxldmVsIjoxNCwibGV2ZWxfeHAiOjEwMDAwMDAsInJlcXVpcmVkX3hwIjozMTk4MDAwfSx7ImxldmVsIjoxNSwibGV2ZWxfeHAiOjUwMDAwMDAsInJlcXVpcmVkX3hwIjo4MTk4MDAwfV19";

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
function base64Decode(str) {
    const decoded = atob(str);
    return decodeURIComponent(escape(decoded));
}

// Decodifica a string BASE64 
const decodedString = base64Decode(base64String);
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
