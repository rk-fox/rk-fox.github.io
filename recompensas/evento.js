// Substitua esta string pelo seu código BASE64
const base64String = "eyJldmVudCI6eyJfaWQiOiI2NmZkMDcyYmUwZGQzNTMwZGFiNmYwNzMiLCJtYXhfeHAiOjM5NTkyMDAwLCJtYXhfbXVsdGlwbGllciI6MTAwMDAsIm1heF9sZXZlbCI6MjUsInByb2dyZXNzaW9uX2V2ZW50X3R5cGUiOiJkZWZhdWx0IiwiZW5kX2RhdGUiOiIyMDI0LTEwLTA3VDE1OjAwOjAwLjAwMFoiLCJsYXN0X3VwZGF0ZWQiOjE3Mjc4NTg0NzU1MzMsImRlc2NyaXB0aW9uIjp7ImVuIjoiWzAy4oCTMDcgT2N0XSBGdXItaWUgYSBEZXV4IiwiY24iOiJbMDLigJMwNyBPY3RdIEZ1ci1pZSBhIERldXgifSwidGl0bGUiOnsiZW4iOiJGdXItaWUgYSBEZXV4IiwiY24iOiJGdXItaWUgYSBEZXV4In19LCJyZXdhcmRzIjpbeyJpZCI6IjY2ZmQwNzJiYTI2YzM3YzMwZmUyNDk4YiIsIml0ZW1faWQiOm51bGwsImFtb3VudCI6MTAsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjoxLCJ0eXBlIjoic2Vhc29uX3Bhc3NfeHAiLCJ0aXRsZSI6eyJlbiI6IlNlYXNvbiBQYXNzIFhQIiwiY24iOiJTZWFzb24gUGFzcyBYUCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6IlNlYXNvbiBQYXNzIFhQIERlc2NyaXB0aW9uIiwiY24iOiJTZWFzb24gUGFzcyBYUCBEZXNjcmlwdGlvbiJ9fSx7ImlkIjoiNjZmZDBhOGNhMjZjMzdjMzBmZTMyOGNhIiwiaXRlbV9pZCI6bnVsbCwiYW1vdW50IjoyNTAwMDAsImN1cnJlbmN5IjoiUkxUIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjoyLCJ0eXBlIjoibW9uZXkiLCJ0aXRsZSI6eyJlbiI6Ik1vbmV5IFRpdGxlIiwiY24iOiJNb25leSBUaXRsZSJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6Ik1vbmV5IFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiTW9uZXkgUmV3YXJkIERlc2NyaXB0aW9uIn19LHsiaWQiOiI2NmZkMGE4Y2EyNmMzN2MzMGZlMzI4Y2UiLCJpdGVtX2lkIjpudWxsLCJhbW91bnQiOjUwMDAwMDAwLCJjdXJyZW5jeSI6IlJTVCIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MywidHlwZSI6Im1vbmV5IiwidGl0bGUiOnsiZW4iOiJNb25leSBUaXRsZSIsImNuIjoiTW9uZXkgVGl0bGUifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNb25leSBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1vbmV5IFJld2FyZCBEZXNjcmlwdGlvbiJ9fSx7ImlkIjoiNjZmZDBhOGNhMjZjMzdjMzBmZTMyOGQ1IiwiaXRlbV9pZCI6IjY0ZWM5MTRjMjJjNzUxMTBiOWIwOTU0ZSIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjQsInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjY0ZWM5MTRjMjJjNzUxMTBiOWIwOTU0ZSIsImNyZWF0ZWRfYnlfdGl0bGUiOnsibGluayI6IiIsInRleHQiOiIifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJJdCBpcyBub3QgYSBjb3B5IG9mIE1lcmdlZGdlLiBOby4gQWJzb2x1dGVseSBub3QuIEJyYW5kLW5ldyBtaW5lci4gRXZlbiBiaW5kaW5nIHZhbHVlIGlzIGRpZmZlcmVudCEgVG90YWxseSBuZXcgbWluZXIuIiwiY24iOiJJdCBpcyBub3QgYSBjb3B5IG9mIE1lcmdlZGdlLiBOby4gQWJzb2x1dGVseSBub3QuIEJyYW5kLW5ldyBtaW5lci4gRXZlbiBiaW5kaW5nIHZhbHVlIGlzIGRpZmZlcmVudCEgVG90YWxseSBuZXcgbWluZXIuIiwiZXMiOiJJdCBpcyBub3QgYSBjb3B5IG9mIE1lcmdlZGdlLiBOby4gQWJzb2x1dGVseSBub3QuIEJyYW5kLW5ldyBtaW5lci4gRXZlbiBiaW5kaW5nIHZhbHVlIGlzIGRpZmZlcmVudCEgVG90YWxseSBuZXcgbWluZXIuIiwicHQiOiJJdCBpcyBub3QgYSBjb3B5IG9mIE1lcmdlZGdlLiBOby4gQWJzb2x1dGVseSBub3QuIEJyYW5kLW5ldyBtaW5lci4gRXZlbiBiaW5kaW5nIHZhbHVlIGlzIGRpZmZlcmVudCEgVG90YWxseSBuZXcgbWluZXIuIn0sImZpbGVuYW1lIjoiYmVyZ2VkZ2UiLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6ZmFsc2UsImxldmVsIjoxLCJuYW1lIjp7ImVuIjoiQmVyZ2VkZ2UiLCJjbiI6IkJlcmdlZGdlIiwiZXMiOiJCZXJnZWRnZSIsInB0IjoiQmVyZ2VkZ2UifSwicG93ZXIiOjk0NTAsInR5cGUiOiJtZXJnZSIsIndpZHRoIjoyLCJib251cyI6OCwiaXNfaW5fc2V0IjpmYWxzZX19LHsiaWQiOiI2NmZkMGE4Y2EyNmMzN2MzMGZlMzI4ZDkiLCJpdGVtX2lkIjoiNjRlYzkwMDgyMmM3NTExMGI5YjA5M2MzIiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6NSwidHlwZSI6Im1pbmVyIiwidGl0bGUiOnsiZW4iOiJNaW5lciBSZXdhcmQiLCJjbiI6Ik1pbmVyIFJld2FyZCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIn0sIml0ZW0iOnsiX2lkIjoiNjRlYzkwMDgyMmM3NTExMGI5YjA5M2MzIiwicG93ZXIiOjM2MDAsIndpZHRoIjoyLCJuYW1lIjp7ImVuIjoiQmVyZ2VkZ2UiLCJjbiI6IkJlcmdlZGdlIiwiZXMiOiJCZXJnZWRnZSIsInB0IjoiQmVyZ2VkZ2UifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJJdCBpcyBub3QgYSBjb3B5IG9mIE1lcmdlZGdlLiBOby4gQWJzb2x1dGVseSBub3QuIEJyYW5kLW5ldyBtaW5lci4gRXZlbiBiaW5kaW5nIHZhbHVlIGlzIGRpZmZlcmVudCEgVG90YWxseSBuZXcgbWluZXIuIiwiY24iOiJJdCBpcyBub3QgYSBjb3B5IG9mIE1lcmdlZGdlLiBOby4gQWJzb2x1dGVseSBub3QuIEJyYW5kLW5ldyBtaW5lci4gRXZlbiBiaW5kaW5nIHZhbHVlIGlzIGRpZmZlcmVudCEgVG90YWxseSBuZXcgbWluZXIuIiwiZXMiOiJJdCBpcyBub3QgYSBjb3B5IG9mIE1lcmdlZGdlLiBOby4gQWJzb2x1dGVseSBub3QuIEJyYW5kLW5ldyBtaW5lci4gRXZlbiBiaW5kaW5nIHZhbHVlIGlzIGRpZmZlcmVudCEgVG90YWxseSBuZXcgbWluZXIuIiwicHQiOiJJdCBpcyBub3QgYSBjb3B5IG9mIE1lcmdlZGdlLiBOby4gQWJzb2x1dGVseSBub3QuIEJyYW5kLW5ldyBtaW5lci4gRXZlbiBiaW5kaW5nIHZhbHVlIGlzIGRpZmZlcmVudCEgVG90YWxseSBuZXcgbWluZXIuIn0sImNyZWF0ZWRfYnlfdGl0bGUiOnsibGluayI6IiIsInRleHQiOiIifSwibGV2ZWwiOjAsInR5cGUiOiJiYXNpYyIsImZpbGVuYW1lIjoiYmVyZ2VkZ2UiLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6ZmFsc2UsImJvbnVzIjowLCJpc19pbl9zZXQiOmZhbHNlfX0seyJpZCI6IjY2ZmQwYThjYTI2YzM3YzMwZmUzMjhkZCIsIml0ZW1faWQiOm51bGwsImFtb3VudCI6MTUsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjo2LCJ0eXBlIjoic2Vhc29uX3Bhc3NfeHAiLCJ0aXRsZSI6eyJlbiI6IlNlYXNvbiBQYXNzIFhQIiwiY24iOiJTZWFzb24gUGFzcyBYUCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6IlNlYXNvbiBQYXNzIFhQIERlc2NyaXB0aW9uIiwiY24iOiJTZWFzb24gUGFzcyBYUCBEZXNjcmlwdGlvbiJ9fSx7ImlkIjoiNjZmZDBhOGNhMjZjMzdjMzBmZTMyOGUxIiwiaXRlbV9pZCI6bnVsbCwiYW1vdW50IjoxMDAwMDAwMDAsImN1cnJlbmN5IjoiUlNUIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjo3LCJ0eXBlIjoibW9uZXkiLCJ0aXRsZSI6eyJlbiI6Ik1vbmV5IFRpdGxlIiwiY24iOiJNb25leSBUaXRsZSJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6Ik1vbmV5IFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiTW9uZXkgUmV3YXJkIERlc2NyaXB0aW9uIn19LHsiaWQiOiI2NmZkMGE4Y2EyNmMzN2MzMGZlMzI4ZTYiLCJpdGVtX2lkIjoiNjRlYzkxNGMyMmM3NTExMGI5YjA5NTU4IiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6OCwidHlwZSI6Im1pbmVyIiwidGl0bGUiOnsiZW4iOiJNaW5lciBSZXdhcmQiLCJjbiI6Ik1pbmVyIFJld2FyZCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIn0sIml0ZW0iOnsiX2lkIjoiNjRlYzkxNGMyMmM3NTExMGI5YjA5NTU4IiwiY3JlYXRlZF9ieV90aXRsZSI6eyJsaW5rIjoiIiwidGV4dCI6IiJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6Ikl0IGlzIG5vdCBhIGNvcHkgb2YgTWVyZ2VkZ2UuIE5vLiBBYnNvbHV0ZWx5IG5vdC4gQnJhbmQtbmV3IG1pbmVyLiBFdmVuIGJpbmRpbmcgdmFsdWUgaXMgZGlmZmVyZW50ISBUb3RhbGx5IG5ldyBtaW5lci4iLCJjbiI6Ikl0IGlzIG5vdCBhIGNvcHkgb2YgTWVyZ2VkZ2UuIE5vLiBBYnNvbHV0ZWx5IG5vdC4gQnJhbmQtbmV3IG1pbmVyLiBFdmVuIGJpbmRpbmcgdmFsdWUgaXMgZGlmZmVyZW50ISBUb3RhbGx5IG5ldyBtaW5lci4iLCJlcyI6Ikl0IGlzIG5vdCBhIGNvcHkgb2YgTWVyZ2VkZ2UuIE5vLiBBYnNvbHV0ZWx5IG5vdC4gQnJhbmQtbmV3IG1pbmVyLiBFdmVuIGJpbmRpbmcgdmFsdWUgaXMgZGlmZmVyZW50ISBUb3RhbGx5IG5ldyBtaW5lci4iLCJwdCI6Ikl0IGlzIG5vdCBhIGNvcHkgb2YgTWVyZ2VkZ2UuIE5vLiBBYnNvbHV0ZWx5IG5vdC4gQnJhbmQtbmV3IG1pbmVyLiBFdmVuIGJpbmRpbmcgdmFsdWUgaXMgZGlmZmVyZW50ISBUb3RhbGx5IG5ldyBtaW5lci4ifSwiZmlsZW5hbWUiOiJiZXJnZWRnZSIsImlzX2Nhbl9iZV9zb2xkX29uX21wIjpmYWxzZSwibGV2ZWwiOjIsIm5hbWUiOnsiZW4iOiJCZXJnZWRnZSIsImNuIjoiQmVyZ2VkZ2UiLCJlcyI6IkJlcmdlZGdlIiwicHQiOiJCZXJnZWRnZSJ9LCJwb3dlciI6MjQ4ODUsInR5cGUiOiJtZXJnZSIsIndpZHRoIjoyLCJib251cyI6MjAsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjZmZDBhOGNhMjZjMzdjMzBmZTMyOGVjIiwiaXRlbV9pZCI6IjYzMWI1NjE3YTc3NWUwNGQ5YTI4NTQ0MiIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjksInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjYzMWI1NjE3YTc3NWUwNGQ5YTI4NTQ0MiIsInBvd2VyIjo5MDAwMCwid2lkdGgiOjIsIm5hbWUiOnsiZW4iOiJSb2xsZXJTaG93IiwiY24iOiJSb2xsZXJTaG93In0sImRlc2NyaXB0aW9uIjp7ImVuIjoiSWYgYSB0aHJpbGwgaXMgd2hhdCB5b3UgbmVlZCB5b3XigJlyZSBpbiB0aGUgcmlnaHQgcGxhY2UuIENvbWUgaW4gYW5kIGxldCB0aGUgU2hvdyBiZWdpbiEgTWFnaWMgQ2Fybml2YWwgU2VyaWVzIE1pbmVyLiIsImNuIjoiSWYgYSB0aHJpbGwgaXMgd2hhdCB5b3UgbmVlZCB5b3XigJlyZSBpbiB0aGUgcmlnaHQgcGxhY2UuIENvbWUgaW4gYW5kIGxldCB0aGUgU2hvdyBiZWdpbiEgTWFnaWMgQ2Fybml2YWwgU2VyaWVzIE1pbmVyLiJ9LCJjcmVhdGVkX2J5X3RpdGxlIjp7ImxpbmsiOiIiLCJ0ZXh0IjoiIn0sImxldmVsIjowLCJ0eXBlIjoiYmFzaWMiLCJmaWxlbmFtZSI6InJvbGxlcnNob3ciLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6dHJ1ZSwiYm9udXMiOjAsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjZmZDBhOGNhMjZjMzdjMzBmZTMyOGYzIiwiaXRlbV9pZCI6IjYzMWY3YjQ3ODIzOGVkMjgzYTIzNTBkYSIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjEwLCJ0eXBlIjoibWluZXIiLCJ0aXRsZSI6eyJlbiI6Ik1pbmVyIFJld2FyZCIsImNuIjoiTWluZXIgUmV3YXJkIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24ifSwiaXRlbSI6eyJfaWQiOiI2MzFmN2I0NzgyMzhlZDI4M2EyMzUwZGEiLCJwb3dlciI6MjM2MjUwLCJ3aWR0aCI6MiwibmFtZSI6eyJlbiI6IlJvbGxlclNob3ciLCJjbiI6IlJvbGxlclNob3cifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJJZiBhIHRocmlsbCBpcyB3aGF0IHlvdSBuZWVkIHlvdeKAmXJlIGluIHRoZSByaWdodCBwbGFjZS4gQ29tZSBpbiBhbmQgbGV0IHRoZSBTaG93IGJlZ2luISBNYWdpYyBDYXJuaXZhbCBTZXJpZXMgTWluZXIuIiwiY24iOiJJZiBhIHRocmlsbCBpcyB3aGF0IHlvdSBuZWVkIHlvdeKAmXJlIGluIHRoZSByaWdodCBwbGFjZS4gQ29tZSBpbiBhbmQgbGV0IHRoZSBTaG93IGJlZ2luISBNYWdpYyBDYXJuaXZhbCBTZXJpZXMgTWluZXIuIn0sImNyZWF0ZWRfYnlfdGl0bGUiOnsibGluayI6IiIsInRleHQiOiIifSwibGV2ZWwiOjEsInR5cGUiOiJtZXJnZSIsImZpbGVuYW1lIjoicm9sbGVyc2hvdyIsImlzX2Nhbl9iZV9zb2xkX29uX21wIjp0cnVlLCJib251cyI6NTUsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjZmZDBhOGNhMjZjMzdjMzBmZTMyOGY4IiwiaXRlbV9pZCI6IjYzNzQxMTliNTI0N2IzYjg5MjE2NGMyNyIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjExLCJ0eXBlIjoibWluZXIiLCJ0aXRsZSI6eyJlbiI6Ik1pbmVyIFJld2FyZCIsImNuIjoiTWluZXIgUmV3YXJkIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24ifSwiaXRlbSI6eyJfaWQiOiI2Mzc0MTE5YjUyNDdiM2I4OTIxNjRjMjciLCJwb3dlciI6MjM4MjQ1LCJ3aWR0aCI6MiwibmFtZSI6eyJlbiI6IkZhaXJ5IERhbmNlciIsImNuIjoiRmFpcnkgRGFuY2VyIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiU3BhcmtsaW5nIGZhaXJ5IGR1c3QgdG8gYm9vc3QgeW91ciBtaW5pbmcgcG93ZXIuIFRoaXMgbWluZXIgaXMgb25lIG9mIHRoZSB0ZW4gc2VsZWN0ZWQgd2lubmVycyBvZiB0aGUgTWluZXJzIEFydCBDb250ZXN0OiBNYWdpYyBCZWFzdHMuIENyZWF0ZWQgYnkgRGVhbiBXYWx0ZXIiLCJjbiI6IlNwYXJrbGluZyBmYWlyeSBkdXN0IHRvIGJvb3N0IHlvdXIgbWluaW5nIHBvd2VyLiBUaGlzIG1pbmVyIGlzIG9uZSBvZiB0aGUgdGVuIHNlbGVjdGVkIHdpbm5lcnMgb2YgdGhlIE1pbmVycyBBcnQgQ29udGVzdDogTWFnaWMgQmVhc3RzLiBDcmVhdGVkIGJ5IERlYW4gV2FsdGVyIn0sImNyZWF0ZWRfYnlfdGl0bGUiOnsibGluayI6IiIsInRleHQiOiIifSwibGV2ZWwiOjEsInR5cGUiOiJtZXJnZSIsImZpbGVuYW1lIjoiZmFpcnlfZGFuY2VyIiwiaXNfY2FuX2JlX3NvbGRfb25fbXAiOnRydWUsImJvbnVzIjo1NSwiaXNfaW5fc2V0IjpmYWxzZX19LHsiaWQiOiI2NmZkMGE4Y2EyNmMzN2MzMGZlMzI4ZmUiLCJpdGVtX2lkIjoiNjM3NDExOWI1MjQ3YjNiODkyMTY0YzI3IiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MTIsInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjYzNzQxMTliNTI0N2IzYjg5MjE2NGMyNyIsInBvd2VyIjoyMzgyNDUsIndpZHRoIjoyLCJuYW1lIjp7ImVuIjoiRmFpcnkgRGFuY2VyIiwiY24iOiJGYWlyeSBEYW5jZXIifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJTcGFya2xpbmcgZmFpcnkgZHVzdCB0byBib29zdCB5b3VyIG1pbmluZyBwb3dlci4gVGhpcyBtaW5lciBpcyBvbmUgb2YgdGhlIHRlbiBzZWxlY3RlZCB3aW5uZXJzIG9mIHRoZSBNaW5lcnMgQXJ0IENvbnRlc3Q6IE1hZ2ljIEJlYXN0cy4gQ3JlYXRlZCBieSBEZWFuIFdhbHRlciIsImNuIjoiU3BhcmtsaW5nIGZhaXJ5IGR1c3QgdG8gYm9vc3QgeW91ciBtaW5pbmcgcG93ZXIuIFRoaXMgbWluZXIgaXMgb25lIG9mIHRoZSB0ZW4gc2VsZWN0ZWQgd2lubmVycyBvZiB0aGUgTWluZXJzIEFydCBDb250ZXN0OiBNYWdpYyBCZWFzdHMuIENyZWF0ZWQgYnkgRGVhbiBXYWx0ZXIifSwiY3JlYXRlZF9ieV90aXRsZSI6eyJsaW5rIjoiIiwidGV4dCI6IiJ9LCJsZXZlbCI6MSwidHlwZSI6Im1lcmdlIiwiZmlsZW5hbWUiOiJmYWlyeV9kYW5jZXIiLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6dHJ1ZSwiYm9udXMiOjU1LCJpc19pbl9zZXQiOmZhbHNlfX0seyJpZCI6IjY2ZmQwYThjYTI2YzM3YzMwZmUzMjkwNCIsIml0ZW1faWQiOiI2NTA5OTI2MjQ4ZWUyYzJhZGE5NWZiOGEiLCJhbW91bnQiOjEsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjoxMywidHlwZSI6Im1pbmVyIiwidGl0bGUiOnsiZW4iOiJNaW5lciBSZXdhcmQiLCJjbiI6Ik1pbmVyIFJld2FyZCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIn0sIml0ZW0iOnsiX2lkIjoiNjUwOTkyNjI0OGVlMmMyYWRhOTVmYjhhIiwicG93ZXIiOjEzMjAwMCwid2lkdGgiOjIsIm5hbWUiOnsiZW4iOiJCYW5oYW1tZXIgTWFzdGVyIiwiY24iOiJCYW5oYW1tZXIgTWFzdGVyIiwiZXMiOiJCYW5oYW1tZXIgTWFzdGVyIiwicHQiOiJCYW5oYW1tZXIgTWFzdGVyIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiSXQncyBiZXR0ZXIgdG8gbWluZSBhbmQgcmVtYWluIHBvbGl0ZSwgYXMgeW91IHdvdWxkbid0IHdhbnQgdG8gYmUgYmFubmVkIGZyb20gdGhlIGNvbW11bml0eSwgd291bGQgeW91PyBCeSBEb3VtcGEiLCJjbiI6Ikl0J3MgYmV0dGVyIHRvIG1pbmUgYW5kIHJlbWFpbiBwb2xpdGUsIGFzIHlvdSB3b3VsZG4ndCB3YW50IHRvIGJlIGJhbm5lZCBmcm9tIHRoZSBjb21tdW5pdHksIHdvdWxkIHlvdT8gQnkgTHVrZW4iLCJlcyI6Ikl0J3MgYmV0dGVyIHRvIG1pbmUgYW5kIHJlbWFpbiBwb2xpdGUsIGFzIHlvdSB3b3VsZG4ndCB3YW50IHRvIGJlIGJhbm5lZCBmcm9tIHRoZSBjb21tdW5pdHksIHdvdWxkIHlvdT8gQnkgTHVrZW4iLCJwdCI6Ikl0J3MgYmV0dGVyIHRvIG1pbmUgYW5kIHJlbWFpbiBwb2xpdGUsIGFzIHlvdSB3b3VsZG4ndCB3YW50IHRvIGJlIGJhbm5lZCBmcm9tIHRoZSBjb21tdW5pdHksIHdvdWxkIHlvdT8gQnkgTHVrZW4ifSwiY3JlYXRlZF9ieV90aXRsZSI6eyJsaW5rIjoiIiwidGV4dCI6IiJ9LCJsZXZlbCI6MCwidHlwZSI6ImJhc2ljIiwiZmlsZW5hbWUiOiJiYW5oYW1tZXJfbWFzdGVyIiwiaXNfY2FuX2JlX3NvbGRfb25fbXAiOnRydWUsImJvbnVzIjowLCJpc19pbl9zZXQiOmZhbHNlfX0seyJpZCI6IjY2ZmQwYThjYTI2YzM3YzMwZmUzMjkwOCIsIml0ZW1faWQiOm51bGwsImFtb3VudCI6NTAsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjoxNCwidHlwZSI6InNlYXNvbl9wYXNzX3hwIiwidGl0bGUiOnsiZW4iOiJTZWFzb24gUGFzcyBYUCIsImNuIjoiU2Vhc29uIFBhc3MgWFAifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJTZWFzb24gUGFzcyBYUCBEZXNjcmlwdGlvbiIsImNuIjoiU2Vhc29uIFBhc3MgWFAgRGVzY3JpcHRpb24ifX0seyJpZCI6IjY2ZmQwYThjYTI2YzM3YzMwZmUzMjkwYyIsIml0ZW1faWQiOm51bGwsImFtb3VudCI6NDAwMDAwMDAwLCJjdXJyZW5jeSI6IlJTVCIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MTUsInR5cGUiOiJtb25leSIsInRpdGxlIjp7ImVuIjoiTW9uZXkgVGl0bGUiLCJjbiI6Ik1vbmV5IFRpdGxlIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTW9uZXkgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNb25leSBSZXdhcmQgRGVzY3JpcHRpb24ifX0seyJpZCI6IjY2ZmQwYThjYTI2YzM3YzMwZmUzMjkxMCIsIml0ZW1faWQiOiI2MzFmN2I0ODgyMzhlZDI4M2EyMzUwZTciLCJhbW91bnQiOjEsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjoxNiwidHlwZSI6Im1pbmVyIiwidGl0bGUiOnsiZW4iOiJNaW5lciBSZXdhcmQiLCJjbiI6Ik1pbmVyIFJld2FyZCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIn0sIml0ZW0iOnsiX2lkIjoiNjMxZjdiNDg4MjM4ZWQyODNhMjM1MGU3IiwicG93ZXIiOjYyMDIzNSwid2lkdGgiOjIsIm5hbWUiOnsiZW4iOiJSb2xsZXJTaG93IiwiY24iOiJSb2xsZXJTaG93In0sImRlc2NyaXB0aW9uIjp7ImVuIjoiSWYgYSB0aHJpbGwgaXMgd2hhdCB5b3UgbmVlZCB5b3XigJlyZSBpbiB0aGUgcmlnaHQgcGxhY2UuIENvbWUgaW4gYW5kIGxldCB0aGUgU2hvdyBiZWdpbiEgTWFnaWMgQ2Fybml2YWwgU2VyaWVzIE1pbmVyLiIsImNuIjoiSWYgYSB0aHJpbGwgaXMgd2hhdCB5b3UgbmVlZCB5b3XigJlyZSBpbiB0aGUgcmlnaHQgcGxhY2UuIENvbWUgaW4gYW5kIGxldCB0aGUgU2hvdyBiZWdpbiEgTWFnaWMgQ2Fybml2YWwgU2VyaWVzIE1pbmVyLiJ9LCJjcmVhdGVkX2J5X3RpdGxlIjp7ImxpbmsiOiIiLCJ0ZXh0IjoiIn0sImxldmVsIjoyLCJ0eXBlIjoibWVyZ2UiLCJmaWxlbmFtZSI6InJvbGxlcnNob3ciLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6dHJ1ZSwiYm9udXMiOjE2NiwiaXNfaW5fc2V0IjpmYWxzZX19LHsiaWQiOiI2NmZkMGE4Y2EyNmMzN2MzMGZlMzI5MTQiLCJpdGVtX2lkIjoiNjMxYjU2MTdhNzc1ZTA0ZDlhMjg1NDQyIiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MTcsInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjYzMWI1NjE3YTc3NWUwNGQ5YTI4NTQ0MiIsInBvd2VyIjo5MDAwMCwid2lkdGgiOjIsIm5hbWUiOnsiZW4iOiJSb2xsZXJTaG93IiwiY24iOiJSb2xsZXJTaG93In0sImRlc2NyaXB0aW9uIjp7ImVuIjoiSWYgYSB0aHJpbGwgaXMgd2hhdCB5b3UgbmVlZCB5b3XigJlyZSBpbiB0aGUgcmlnaHQgcGxhY2UuIENvbWUgaW4gYW5kIGxldCB0aGUgU2hvdyBiZWdpbiEgTWFnaWMgQ2Fybml2YWwgU2VyaWVzIE1pbmVyLiIsImNuIjoiSWYgYSB0aHJpbGwgaXMgd2hhdCB5b3UgbmVlZCB5b3XigJlyZSBpbiB0aGUgcmlnaHQgcGxhY2UuIENvbWUgaW4gYW5kIGxldCB0aGUgU2hvdyBiZWdpbiEgTWFnaWMgQ2Fybml2YWwgU2VyaWVzIE1pbmVyLiJ9LCJjcmVhdGVkX2J5X3RpdGxlIjp7ImxpbmsiOiIiLCJ0ZXh0IjoiIn0sImxldmVsIjowLCJ0eXBlIjoiYmFzaWMiLCJmaWxlbmFtZSI6InJvbGxlcnNob3ciLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6dHJ1ZSwiYm9udXMiOjAsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjZmZDBhOGNhMjZjMzdjMzBmZTMyOTE4IiwiaXRlbV9pZCI6bnVsbCwiYW1vdW50Ijo2MDAwMDAwMDAsImN1cnJlbmN5IjoiUlNUIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjoxOCwidHlwZSI6Im1vbmV5IiwidGl0bGUiOnsiZW4iOiJNb25leSBUaXRsZSIsImNuIjoiTW9uZXkgVGl0bGUifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNb25leSBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1vbmV5IFJld2FyZCBEZXNjcmlwdGlvbiJ9fSx7ImlkIjoiNjZmZDBhOGNhMjZjMzdjMzBmZTMyOTFkIiwiaXRlbV9pZCI6IjY0ZDYyOTliNmQ3MDA4MTQ4NTc1ZGY3OSIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjE5LCJ0eXBlIjoicmFjayIsInRpdGxlIjp7ImVuIjoiUmFjayBUaXRsZSIsImNuIjoiUmFjayBUaXRsZSJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6IlJhY2sgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJSYWNrIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Im5hbWUiOnsiZW4iOiJTaWx2ZXIgUmFjayA4IiwiY24iOiJTaWx2ZXIgUmFjayA4In0sImRlc2NyaXB0aW9uIjp7ImVuIjoiV2hlbiB5b3UgYXNrZWQgdGhlIHNlbGxlciBhYm91dCB0aGUgbWF0ZXJpYWwgb2YgdGhpcyByYWNrLCBoZSBqb2tpbmdseSByZXNwb25kZWQgd2l0aCAnU2lsdmVyLicgSXQgc2VlbXMgaGUgaGFkIHF1aXRlIGFuIHVudXN1YWwgc2Vuc2Ugb2YgaHVtb3IsIGJ1dCB0aGlzIHN0dXJkeSBhbmQgc3BhY2lvdXMgJ1NpbHZlcicgUmFjayBmb3IgbWluZXJzIHByb3ZlcyB0aGF0IHRoZXJlJ3MgbW9yZSB0byBpdCB0aGFuIG1lZXRzIHRoZSBleWUuIiwiY24iOiJXaGVuIHlvdSBhc2tlZCB0aGUgc2VsbGVyIGFib3V0IHRoZSBtYXRlcmlhbCBvZiB0aGlzIHJhY2ssIGhlIGpva2luZ2x5IHJlc3BvbmRlZCB3aXRoICdTaWx2ZXIuJyBJdCBzZWVtcyBoZSBoYWQgcXVpdGUgYW4gdW51c3VhbCBzZW5zZSBvZiBodW1vciwgYnV0IHRoaXMgc3R1cmR5IGFuZCBzcGFjaW91cyAnU2lsdmVyJyBSYWNrIGZvciBtaW5lcnMgcHJvdmVzIHRoYXQgdGhlcmUncyBtb3JlIHRvIGl0IHRoYW4gbWVldHMgdGhlIGV5ZS4ifSwiX2lkIjoiNjRkNjI5OWI2ZDcwMDgxNDg1NzVkZjc5IiwiY2FwYWNpdHkiOjgsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjZmZDBhOGNhMjZjMzdjMzBmZTMyOTIzIiwiaXRlbV9pZCI6IjYzNzQxMWMzNTI0N2IzYjg5MjE3NGUwNCIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjIwLCJ0eXBlIjoibWluZXIiLCJ0aXRsZSI6eyJlbiI6Ik1pbmVyIFJld2FyZCIsImNuIjoiTWluZXIgUmV3YXJkIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24ifSwiaXRlbSI6eyJfaWQiOiI2Mzc0MTFjMzUyNDdiM2I4OTIxNzRlMDQiLCJwb3dlciI6NjI1NDg1LCJ3aWR0aCI6MiwibmFtZSI6eyJlbiI6IkZhaXJ5IERhbmNlciIsImNuIjoiRmFpcnkgRGFuY2VyIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiU3BhcmtsaW5nIGZhaXJ5IGR1c3QgdG8gYm9vc3QgeW91ciBtaW5pbmcgcG93ZXIuIFRoaXMgbWluZXIgaXMgb25lIG9mIHRoZSB0ZW4gc2VsZWN0ZWQgd2lubmVycyBvZiB0aGUgTWluZXJzIEFydCBDb250ZXN0OiBNYWdpYyBCZWFzdHMuIENyZWF0ZWQgYnkgRGVhbiBXYWx0ZXIiLCJjbiI6IlNwYXJrbGluZyBmYWlyeSBkdXN0IHRvIGJvb3N0IHlvdXIgbWluaW5nIHBvd2VyLiBUaGlzIG1pbmVyIGlzIG9uZSBvZiB0aGUgdGVuIHNlbGVjdGVkIHdpbm5lcnMgb2YgdGhlIE1pbmVycyBBcnQgQ29udGVzdDogTWFnaWMgQmVhc3RzLiBDcmVhdGVkIGJ5IERlYW4gV2FsdGVyIn0sImNyZWF0ZWRfYnlfdGl0bGUiOnsibGluayI6IiIsInRleHQiOiIifSwibGV2ZWwiOjIsInR5cGUiOiJtZXJnZSIsImZpbGVuYW1lIjoiZmFpcnlfZGFuY2VyIiwiaXNfY2FuX2JlX3NvbGRfb25fbXAiOnRydWUsImJvbnVzIjoxNjYsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjZmZDBhOGNhMjZjMzdjMzBmZTMyOTI3IiwiaXRlbV9pZCI6bnVsbCwiYW1vdW50IjoxMDAsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjoyMSwidHlwZSI6InNlYXNvbl9wYXNzX3hwIiwidGl0bGUiOnsiZW4iOiJTZWFzb24gUGFzcyBYUCIsImNuIjoiU2Vhc29uIFBhc3MgWFAifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJTZWFzb24gUGFzcyBYUCBEZXNjcmlwdGlvbiIsImNuIjoiU2Vhc29uIFBhc3MgWFAgRGVzY3JpcHRpb24ifX0seyJpZCI6IjY2ZmQwYThjYTI2YzM3YzMwZmUzMjkyYiIsIml0ZW1faWQiOiI2NDlkOGQ3MzYzNjA2MGRlNzQ2YWJkNjAiLCJhbW91bnQiOjEsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjoyMiwidHlwZSI6Im1pbmVyIiwidGl0bGUiOnsiZW4iOiJNaW5lciBSZXdhcmQiLCJjbiI6Ik1pbmVyIFJld2FyZCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIn0sIml0ZW0iOnsiX2lkIjoiNjQ5ZDhkNzM2MzYwNjBkZTc0NmFiZDYwIiwicG93ZXIiOjcwODc1MCwid2lkdGgiOjIsIm5hbWUiOnsiZW4iOiJUaGUgTW9uZXkgTWFrZXIiLCJjbiI6IlRoZSBNb25leSBNYWtlciIsImVzIjoiVGhlIE1vbmV5IE1ha2VyIiwicHQiOiJUaGUgTW9uZXkgTWFrZXIifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJUaGUgc3Bpcml0IG9mIHRoZSBCdWxsIGFuZCB0aGUgdGVuYWNpdHkgb2YgdGhlIEJlYXIsIHRoaXMgbWluZXIgaGFzIHRoZSBzYW1lIHN0cmVuZ3RoIGFuZCByZXNpbGllbmNlIGFzIHRoZSBBbWVyaWNhbiBmaW5hbmNpYWwgc3lzdGVtIGFuZCByZWFkeSB0byBoZWxwIHlvdSBidWlsZCB5b3VyIGNyeXB0byBmb3J0dW5lISBDcmVhdGVkIGJ5SGVsbWVyIiwiY24iOiJUaGUgc3Bpcml0IG9mIHRoZSBCdWxsIGFuZCB0aGUgdGVuYWNpdHkgb2YgdGhlIEJlYXIsIHRoaXMgbWluZXIgaGFzIHRoZSBzYW1lIHN0cmVuZ3RoIGFuZCByZXNpbGllbmNlIGFzIHRoZSBBbWVyaWNhbiBmaW5hbmNpYWwgc3lzdGVtIGFuZCByZWFkeSB0byBoZWxwIHlvdSBidWlsZCB5b3VyIGNyeXB0byBmb3J0dW5lISBDcmVhdGVkIGJ5SGVsbWVyIiwiZXMiOiJUaGUgc3Bpcml0IG9mIHRoZSBCdWxsIGFuZCB0aGUgdGVuYWNpdHkgb2YgdGhlIEJlYXIsIHRoaXMgbWluZXIgaGFzIHRoZSBzYW1lIHN0cmVuZ3RoIGFuZCByZXNpbGllbmNlIGFzIHRoZSBBbWVyaWNhbiBmaW5hbmNpYWwgc3lzdGVtIGFuZCByZWFkeSB0byBoZWxwIHlvdSBidWlsZCB5b3VyIGNyeXB0byBmb3J0dW5lISBDcmVhdGVkIGJ5SGVsbWVyIiwicHQiOiJUaGUgc3Bpcml0IG9mIHRoZSBCdWxsIGFuZCB0aGUgdGVuYWNpdHkgb2YgdGhlIEJlYXIsIHRoaXMgbWluZXIgaGFzIHRoZSBzYW1lIHN0cmVuZ3RoIGFuZCByZXNpbGllbmNlIGFzIHRoZSBBbWVyaWNhbiBmaW5hbmNpYWwgc3lzdGVtIGFuZCByZWFkeSB0byBoZWxwIHlvdSBidWlsZCB5b3VyIGNyeXB0byBmb3J0dW5lISBDcmVhdGVkIGJ5SGVsbWVyIn0sImNyZWF0ZWRfYnlfdGl0bGUiOnsibGluayI6IiIsInRleHQiOiJIZWxtZXIifSwibGV2ZWwiOjEsInR5cGUiOiJtZXJnZSIsImZpbGVuYW1lIjoidGhlX21vbmV5X21ha2VyIiwiaXNfY2FuX2JlX3NvbGRfb25fbXAiOnRydWUsImJvbnVzIjoxODIsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjZmZDBhOGNhMjZjMzdjMzBmZTMyOTJmIiwiaXRlbV9pZCI6IjYzMWY3YjQ5ODIzOGVkMjgzYTIzNTBmNCIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjIzLCJ0eXBlIjoibWluZXIiLCJ0aXRsZSI6eyJlbiI6Ik1pbmVyIFJld2FyZCIsImNuIjoiTWluZXIgUmV3YXJkIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24ifSwiaXRlbSI6eyJfaWQiOiI2MzFmN2I0OTgyMzhlZDI4M2EyMzUwZjQiLCJwb3dlciI6MTYyODEzMCwid2lkdGgiOjIsIm5hbWUiOnsiZW4iOiJSb2xsZXJTaG93IiwiY24iOiJSb2xsZXJTaG93In0sImRlc2NyaXB0aW9uIjp7ImVuIjoiSWYgYSB0aHJpbGwgaXMgd2hhdCB5b3UgbmVlZCB5b3XigJlyZSBpbiB0aGUgcmlnaHQgcGxhY2UuIENvbWUgaW4gYW5kIGxldCB0aGUgU2hvdyBiZWdpbiEgTWFnaWMgQ2Fybml2YWwgU2VyaWVzIE1pbmVyLiIsImNuIjoiSWYgYSB0aHJpbGwgaXMgd2hhdCB5b3UgbmVlZCB5b3XigJlyZSBpbiB0aGUgcmlnaHQgcGxhY2UuIENvbWUgaW4gYW5kIGxldCB0aGUgU2hvdyBiZWdpbiEgTWFnaWMgQ2Fybml2YWwgU2VyaWVzIE1pbmVyLiJ9LCJjcmVhdGVkX2J5X3RpdGxlIjp7ImxpbmsiOiIiLCJ0ZXh0IjoiIn0sImxldmVsIjozLCJ0eXBlIjoibWVyZ2UiLCJmaWxlbmFtZSI6InJvbGxlcnNob3ciLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6dHJ1ZSwiYm9udXMiOjIwOCwiaXNfaW5fc2V0IjpmYWxzZX19LHsiaWQiOiI2NmZkMGE4Y2EyNmMzN2MzMGZlMzI5MzUiLCJpdGVtX2lkIjoiNjY3YTk0ZGU3YWFkZmQwNjZiYTMyY2M2IiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MjQsInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjY2N2E5NGRlN2FhZGZkMDY2YmEzMmNjNiIsInBvd2VyIjo0MjAwMDAwLCJ3aWR0aCI6MiwibmFtZSI6eyJlbiI6IkNyeXB0b0tuaWdodCIsImNuIjoiQ3J5cHRvS25pZ2h0IiwiZXMiOiJDcnlwdG9LbmlnaHQiLCJwdCI6IkNyeXB0b0tuaWdodCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6IkludHJvZHVjaW5nIENyeXB0b0tuaWdodCwgdGhlIHZpZ2lsYW50ZSBvZiB0aGUgbWluaW5nIHdvcmxkLCBkZXNpZ25lZCB0byBoYXJuZXNzIHRoZSBwb3dlciBvZiB0aGUgYmxvY2tjaGFpbiB3aXRoIHRoZSBzdGVhbHRoIGFuZCBwcmVjaXNpb24gb2YgR290aGFtJ3MgRGFyayBLbmlnaHQuIFRoaXMgZGV2aWNlIGlzIG5vdCBqdXN0IGEgbWluZXI7IGl0J3MgeW91ciBzaWxlbnQgZ3VhcmRpYW4sIGEgd2F0Y2hmdWwgcHJvdGVjdG9yIGFnYWluc3QgdGhlIEpva2VycyBvZiB0aGUgY3J5cHRvIG1hcmtldC4iLCJjbiI6IkludHJvZHVjaW5nIENyeXB0b0tuaWdodCwgdGhlIHZpZ2lsYW50ZSBvZiB0aGUgbWluaW5nIHdvcmxkLCBkZXNpZ25lZCB0byBoYXJuZXNzIHRoZSBwb3dlciBvZiB0aGUgYmxvY2tjaGFpbiB3aXRoIHRoZSBzdGVhbHRoIGFuZCBwcmVjaXNpb24gb2YgR290aGFtJ3MgRGFyayBLbmlnaHQuIFRoaXMgZGV2aWNlIGlzIG5vdCBqdXN0IGEgbWluZXI7IGl0J3MgeW91ciBzaWxlbnQgZ3VhcmRpYW4sIGEgd2F0Y2hmdWwgcHJvdGVjdG9yIGFnYWluc3QgdGhlIEpva2VycyBvZiB0aGUgY3J5cHRvIG1hcmtldC4iLCJlcyI6IkludHJvZHVjaW5nIENyeXB0b0tuaWdodCwgdGhlIHZpZ2lsYW50ZSBvZiB0aGUgbWluaW5nIHdvcmxkLCBkZXNpZ25lZCB0byBoYXJuZXNzIHRoZSBwb3dlciBvZiB0aGUgYmxvY2tjaGFpbiB3aXRoIHRoZSBzdGVhbHRoIGFuZCBwcmVjaXNpb24gb2YgR290aGFtJ3MgRGFyayBLbmlnaHQuIFRoaXMgZGV2aWNlIGlzIG5vdCBqdXN0IGEgbWluZXI7IGl0J3MgeW91ciBzaWxlbnQgZ3VhcmRpYW4sIGEgd2F0Y2hmdWwgcHJvdGVjdG9yIGFnYWluc3QgdGhlIEpva2VycyBvZiB0aGUgY3J5cHRvIG1hcmtldC4iLCJwdCI6IkludHJvZHVjaW5nIENyeXB0b0tuaWdodCwgdGhlIHZpZ2lsYW50ZSBvZiB0aGUgbWluaW5nIHdvcmxkLCBkZXNpZ25lZCB0byBoYXJuZXNzIHRoZSBwb3dlciBvZiB0aGUgYmxvY2tjaGFpbiB3aXRoIHRoZSBzdGVhbHRoIGFuZCBwcmVjaXNpb24gb2YgR290aGFtJ3MgRGFyayBLbmlnaHQuIFRoaXMgZGV2aWNlIGlzIG5vdCBqdXN0IGEgbWluZXI7IGl0J3MgeW91ciBzaWxlbnQgZ3VhcmRpYW4sIGEgd2F0Y2hmdWwgcHJvdGVjdG9yIGFnYWluc3QgdGhlIEpva2VycyBvZiB0aGUgY3J5cHRvIG1hcmtldC4ifSwiY3JlYXRlZF9ieV90aXRsZSI6eyJsaW5rIjoiIiwidGV4dCI6IiJ9LCJsZXZlbCI6MCwidHlwZSI6ImJhc2ljIiwiZmlsZW5hbWUiOiJjcnlwdG9rbmlnaHQiLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6dHJ1ZSwiYm9udXMiOjI1MCwiaXNfaW5fc2V0IjpmYWxzZX19LHsiaWQiOiI2NmZkMGE4Y2EyNmMzN2MzMGZlMzI5MzkiLCJpdGVtX2lkIjoiNjZmZDA2NDNlMGRkMzUzMGRhYjZlZjc1IiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MjUsInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjY2ZmQwNjQzZTBkZDM1MzBkYWI2ZWY3NSIsInBvd2VyIjoxMDAwMDAwMCwid2lkdGgiOjIsIm5hbWUiOnsiZW4iOiJIdW10aHVyIEZsZWNrIiwiY24iOiJIdW10aHVyIEZsZWNrIiwiZXMiOiJIdW10aHVyIEZsZWNrIiwicHQiOiJIdW10aHVyIEZsZWNrIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiRW1icmFjZSB0aGUgdW5wcmVkaWN0YWJsZSB3aXRoIEh1bXRodXIgRmxlY2ssIGEgbWluZXIgdGhhdCBsYXVnaHMgaW4gdGhlIGZhY2Ugb2YgY29udmVudGlvbi4gSXQgc3BpbnMgdGhyb3VnaCBhbGdvcml0aG1zIGxpa2UgYSB3aWxkIGNhcmQsIHR1cm5pbmcgY2hhb3MgaW50byBjcnlwdG8gZ2FpbnMgd2l0aCBldmVyeSBlcnJhdGljIG1vdmXigJRiZWNhdXNlIGluIHRoaXMgZ2FtZSwgZm9ydHVuZSBhbHdheXMgZmF2b3JzIHRoZSBib2xkLiIsImNuIjoiRW1icmFjZSB0aGUgdW5wcmVkaWN0YWJsZSB3aXRoIEh1bXRodXIgRmxlY2ssIGEgbWluZXIgdGhhdCBsYXVnaHMgaW4gdGhlIGZhY2Ugb2YgY29udmVudGlvbi4gSXQgc3BpbnMgdGhyb3VnaCBhbGdvcml0aG1zIGxpa2UgYSB3aWxkIGNhcmQsIHR1cm5pbmcgY2hhb3MgaW50byBjcnlwdG8gZ2FpbnMgd2l0aCBldmVyeSBlcnJhdGljIG1vdmXigJRiZWNhdXNlIGluIHRoaXMgZ2FtZSwgZm9ydHVuZSBhbHdheXMgZmF2b3JzIHRoZSBib2xkLiIsImVzIjoiRW1icmFjZSB0aGUgdW5wcmVkaWN0YWJsZSB3aXRoIEh1bXRodXIgRmxlY2ssIGEgbWluZXIgdGhhdCBsYXVnaHMgaW4gdGhlIGZhY2Ugb2YgY29udmVudGlvbi4gSXQgc3BpbnMgdGhyb3VnaCBhbGdvcml0aG1zIGxpa2UgYSB3aWxkIGNhcmQsIHR1cm5pbmcgY2hhb3MgaW50byBjcnlwdG8gZ2FpbnMgd2l0aCBldmVyeSBlcnJhdGljIG1vdmXigJRiZWNhdXNlIGluIHRoaXMgZ2FtZSwgZm9ydHVuZSBhbHdheXMgZmF2b3JzIHRoZSBib2xkLiIsInB0IjoiRW1icmFjZSB0aGUgdW5wcmVkaWN0YWJsZSB3aXRoIEh1bXRodXIgRmxlY2ssIGEgbWluZXIgdGhhdCBsYXVnaHMgaW4gdGhlIGZhY2Ugb2YgY29udmVudGlvbi4gSXQgc3BpbnMgdGhyb3VnaCBhbGdvcml0aG1zIGxpa2UgYSB3aWxkIGNhcmQsIHR1cm5pbmcgY2hhb3MgaW50byBjcnlwdG8gZ2FpbnMgd2l0aCBldmVyeSBlcnJhdGljIG1vdmXigJRiZWNhdXNlIGluIHRoaXMgZ2FtZSwgZm9ydHVuZSBhbHdheXMgZmF2b3JzIHRoZSBib2xkLiJ9LCJjcmVhdGVkX2J5X3RpdGxlIjp7ImxpbmsiOiIiLCJ0ZXh0IjoiIn0sImxldmVsIjowLCJ0eXBlIjoiYmFzaWMiLCJmaWxlbmFtZSI6Imh1bXRodXJfZmxlY2siLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6dHJ1ZSwiYm9udXMiOjcyMCwiaXNfaW5fc2V0IjpmYWxzZX19XSwibGV2ZWxzX2NvbmZpZyI6W3sibGV2ZWwiOjEsImxldmVsX3hwIjoyMDAwLCJyZXF1aXJlZF94cCI6MjAwMH0seyJsZXZlbCI6MiwibGV2ZWxfeHAiOjQwMDAsInJlcXVpcmVkX3hwIjo2MDAwfSx7ImxldmVsIjozLCJsZXZlbF94cCI6NjAwMCwicmVxdWlyZWRfeHAiOjEyMDAwfSx7ImxldmVsIjo0LCJsZXZlbF94cCI6MTQwMDAsInJlcXVpcmVkX3hwIjoyNjAwMH0seyJsZXZlbCI6NSwibGV2ZWxfeHAiOjQwMDAsInJlcXVpcmVkX3hwIjozMDAwMH0seyJsZXZlbCI6NiwibGV2ZWxfeHAiOjEwMDAwLCJyZXF1aXJlZF94cCI6NDAwMDB9LHsibGV2ZWwiOjcsImxldmVsX3hwIjoyMDAwMCwicmVxdWlyZWRfeHAiOjYwMDAwfSx7ImxldmVsIjo4LCJsZXZlbF94cCI6MzIwMDAsInJlcXVpcmVkX3hwIjo5MjAwMH0seyJsZXZlbCI6OSwibGV2ZWxfeHAiOjEwMDAwMCwicmVxdWlyZWRfeHAiOjE5MjAwMH0seyJsZXZlbCI6MTAsImxldmVsX3hwIjozMDAwMDAsInJlcXVpcmVkX3hwIjo0OTIwMDB9LHsibGV2ZWwiOjExLCJsZXZlbF94cCI6NTAwMDAwLCJyZXF1aXJlZF94cCI6OTkyMDAwfSx7ImxldmVsIjoxMiwibGV2ZWxfeHAiOjYwMDAwMCwicmVxdWlyZWRfeHAiOjE1OTIwMDB9LHsibGV2ZWwiOjEzLCJsZXZlbF94cCI6MjAwMDAwLCJyZXF1aXJlZF94cCI6MTc5MjAwMH0seyJsZXZlbCI6MTQsImxldmVsX3hwIjo1MDAwMDAsInJlcXVpcmVkX3hwIjoyMjkyMDAwfSx7ImxldmVsIjoxNSwibGV2ZWxfeHAiOjYwMDAwMCwicmVxdWlyZWRfeHAiOjI4OTIwMDB9LHsibGV2ZWwiOjE2LCJsZXZlbF94cCI6MTIwMDAwMCwicmVxdWlyZWRfeHAiOjQwOTIwMDB9LHsibGV2ZWwiOjE3LCJsZXZlbF94cCI6MzAwMDAwLCJyZXF1aXJlZF94cCI6NDM5MjAwMH0seyJsZXZlbCI6MTgsImxldmVsX3hwIjo2MDAwMDAsInJlcXVpcmVkX3hwIjo0OTkyMDAwfSx7ImxldmVsIjoxOSwibGV2ZWxfeHAiOjEwMDAwMDAsInJlcXVpcmVkX3hwIjo1OTkyMDAwfSx7ImxldmVsIjoyMCwibGV2ZWxfeHAiOjE0MDAwMDAsInJlcXVpcmVkX3hwIjo3MzkyMDAwfSx7ImxldmVsIjoyMSwibGV2ZWxfeHAiOjYwMDAwMCwicmVxdWlyZWRfeHAiOjc5OTIwMDB9LHsibGV2ZWwiOjIyLCJsZXZlbF94cCI6MTYwMDAwMCwicmVxdWlyZWRfeHAiOjk1OTIwMDB9LHsibGV2ZWwiOjIzLCJsZXZlbF94cCI6NDAwMDAwMCwicmVxdWlyZWRfeHAiOjEzNTkyMDAwfSx7ImxldmVsIjoyNCwibGV2ZWxfeHAiOjYwMDAwMDAsInJlcXVpcmVkX3hwIjoxOTU5MjAwMH0seyJsZXZlbCI6MjUsImxldmVsX3hwIjoyMDAwMDAwMCwicmVxdWlyZWRfeHAiOjM5NTkyMDAwfV19";

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
