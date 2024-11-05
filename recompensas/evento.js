// Substitua esta string pelo seu código BASE64
const base64String = "eyJldmVudCI6eyJfaWQiOiI2NzI5MzlhMDExMzc3MzkxYTBkNTFjNWUiLCJtYXhfeHAiOjEzMzExMDAwLCJtYXhfbXVsdGlwbGllciI6MTAwMDAsIm1heF9sZXZlbCI6MjUsInByb2dyZXNzaW9uX2V2ZW50X3R5cGUiOiJkZWZhdWx0IiwiZW5kX2RhdGUiOiIyMDI0LTExLTA4VDE1OjAwOjAwLjAwMFoiLCJsYXN0X3VwZGF0ZWQiOjE3MzA3NTQ5NzY1MjUsImRlc2NyaXB0aW9uIjp7ImVuIjoiWzA14oCTMDhdIExldCdzIFJvY2shIiwiY24iOiJbMDXigJMwOF0gTGV0J3MgUm9jayEifSwidGl0bGUiOnsiZW4iOiJMZXQncyBSb2NrISIsImNuIjoiTGV0J3MgUm9jayEifX0sInJld2FyZHMiOlt7ImlkIjoiNjcyOTM5YTBhMjZjMzdjMzBmZDg4ZjhiIiwiaXRlbV9pZCI6bnVsbCwiYW1vdW50IjoxNTAwMDAwMCwiY3VycmVuY3kiOiJSU1QiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjEsInR5cGUiOiJtb25leSIsInRpdGxlIjp7ImVuIjoiTW9uZXkgVGl0bGUiLCJjbiI6Ik1vbmV5IFRpdGxlIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTW9uZXkgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNb25leSBSZXdhcmQgRGVzY3JpcHRpb24ifX0seyJpZCI6IjY3MjkzOWEwYTI2YzM3YzMwZmQ4OGY4ZiIsIml0ZW1faWQiOm51bGwsImFtb3VudCI6NTAwMDAwLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjo2MDQ4MDAwMDAsInJlcXVpcmVkX2xldmVsIjoyLCJ0eXBlIjoicG93ZXIiLCJ0aXRsZSI6eyJlbiI6IlBvd2VyIiwiY24iOiJQb3dlciJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6IlBvd2VyIFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiUG93ZXIgUmV3YXJkIERlc2NyaXB0aW9uIn19LHsiaWQiOiI2NzI5MzlhMGEyNmMzN2MzMGZkODhmOTMiLCJpdGVtX2lkIjoiNjUwMDQzODYyMjE2ZTE4NDFlYmE4NTJmIiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MywidHlwZSI6Im1pbmVyIiwidGl0bGUiOnsiZW4iOiJNaW5lciBSZXdhcmQiLCJjbiI6Ik1pbmVyIFJld2FyZCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIn0sIml0ZW0iOnsiX2lkIjoiNjUwMDQzODYyMjE2ZTE4NDFlYmE4NTJmIiwicG93ZXIiOjYwMDAsIndpZHRoIjoxLCJuYW1lIjp7ImVuIjoiQml0QWNlIiwiY24iOiJCaXRBY2UiLCJlcyI6IkJpdEFjZSIsInB0IjoiQml0QWNlIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiWW91ciBjcnlwdG8gbWluaW5nIGFjZSIsImNuIjoiWW91ciBjcnlwdG8gbWluaW5nIGFjZSIsImVzIjoiWW91ciBjcnlwdG8gbWluaW5nIGFjZSIsInB0IjoiWW91ciBjcnlwdG8gbWluaW5nIGFjZSJ9LCJjcmVhdGVkX2J5X3RpdGxlIjp7ImxpbmsiOiIiLCJ0ZXh0IjoiIn0sImxldmVsIjowLCJ0eXBlIjoiYmFzaWMiLCJmaWxlbmFtZSI6ImJpdGFjZSIsImlzX2Nhbl9iZV9zb2xkX29uX21wIjpmYWxzZSwiYm9udXMiOjAsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjcyOTM5YTBhMjZjMzdjMzBmZDg4Zjk3IiwiaXRlbV9pZCI6IjY1MDA0Mzg2MjIxNmUxODQxZWJhODUzMiIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjQsInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjY1MDA0Mzg2MjIxNmUxODQxZWJhODUzMiIsInBvd2VyIjoxNTc1MCwid2lkdGgiOjEsIm5hbWUiOnsiZW4iOiJCaXRBY2UiLCJjbiI6IkJpdEFjZSIsImVzIjoiQml0QWNlIiwicHQiOiJCaXRBY2UifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJZb3VyIGNyeXB0byBtaW5pbmcgYWNlIiwiY24iOiJZb3VyIGNyeXB0byBtaW5pbmcgYWNlIiwiZXMiOiJZb3VyIGNyeXB0byBtaW5pbmcgYWNlIiwicHQiOiJZb3VyIGNyeXB0byBtaW5pbmcgYWNlIn0sImNyZWF0ZWRfYnlfdGl0bGUiOnsibGluayI6IiIsInRleHQiOiIifSwibGV2ZWwiOjEsInR5cGUiOiJtZXJnZSIsImZpbGVuYW1lIjoiYml0YWNlIiwiaXNfY2FuX2JlX3NvbGRfb25fbXAiOmZhbHNlLCJib251cyI6OCwiaXNfaW5fc2V0IjpmYWxzZX19LHsiaWQiOiI2NzI5MzlhMGEyNmMzN2MzMGZkODhmOWQiLCJpdGVtX2lkIjpudWxsLCJhbW91bnQiOjEwMDAwMDAsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjYwNDgwMDAwMCwicmVxdWlyZWRfbGV2ZWwiOjUsInR5cGUiOiJwb3dlciIsInRpdGxlIjp7ImVuIjoiUG93ZXIiLCJjbiI6IlBvd2VyIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiUG93ZXIgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJQb3dlciBSZXdhcmQgRGVzY3JpcHRpb24ifX0seyJpZCI6IjY3MjkzOWEwYTI2YzM3YzMwZmQ4OGZhMSIsIml0ZW1faWQiOiI2NTAwNDM4NjIyMTZlMTg0MWViYTg1MzIiLCJhbW91bnQiOjEsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjo2LCJ0eXBlIjoibWluZXIiLCJ0aXRsZSI6eyJlbiI6Ik1pbmVyIFJld2FyZCIsImNuIjoiTWluZXIgUmV3YXJkIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24ifSwiaXRlbSI6eyJfaWQiOiI2NTAwNDM4NjIyMTZlMTg0MWViYTg1MzIiLCJwb3dlciI6MTU3NTAsIndpZHRoIjoxLCJuYW1lIjp7ImVuIjoiQml0QWNlIiwiY24iOiJCaXRBY2UiLCJlcyI6IkJpdEFjZSIsInB0IjoiQml0QWNlIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiWW91ciBjcnlwdG8gbWluaW5nIGFjZSIsImNuIjoiWW91ciBjcnlwdG8gbWluaW5nIGFjZSIsImVzIjoiWW91ciBjcnlwdG8gbWluaW5nIGFjZSIsInB0IjoiWW91ciBjcnlwdG8gbWluaW5nIGFjZSJ9LCJjcmVhdGVkX2J5X3RpdGxlIjp7ImxpbmsiOiIiLCJ0ZXh0IjoiIn0sImxldmVsIjoxLCJ0eXBlIjoibWVyZ2UiLCJmaWxlbmFtZSI6ImJpdGFjZSIsImlzX2Nhbl9iZV9zb2xkX29uX21wIjpmYWxzZSwiYm9udXMiOjgsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjcyOTM5YTBhMjZjMzdjMzBmZDg4ZmE1IiwiaXRlbV9pZCI6bnVsbCwiYW1vdW50Ijo1MDAwMDAwMCwiY3VycmVuY3kiOiJSU1QiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjcsInR5cGUiOiJtb25leSIsInRpdGxlIjp7ImVuIjoiTW9uZXkgVGl0bGUiLCJjbiI6Ik1vbmV5IFRpdGxlIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTW9uZXkgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNb25leSBSZXdhcmQgRGVzY3JpcHRpb24ifX0seyJpZCI6IjY3MjkzOWEwYTI2YzM3YzMwZmQ4OGZhOSIsIml0ZW1faWQiOm51bGwsImFtb3VudCI6MjAwMDAwMCwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6NjA0ODAwMDAwLCJyZXF1aXJlZF9sZXZlbCI6OCwidHlwZSI6InBvd2VyIiwidGl0bGUiOnsiZW4iOiJQb3dlciIsImNuIjoiUG93ZXIifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJQb3dlciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6IlBvd2VyIFJld2FyZCBEZXNjcmlwdGlvbiJ9fSx7ImlkIjoiNjcyOTM5YTBhMjZjMzdjMzBmZDg4ZmFkIiwiaXRlbV9pZCI6IjY1MDk5MzUyNDhlZTJjMmFkYTk1ZmNhMiIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjksInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjY1MDk5MzUyNDhlZTJjMmFkYTk1ZmNhMiIsInBvd2VyIjoxODAwMDAsIndpZHRoIjoyLCJuYW1lIjp7ImVuIjoiUGluayBHbGF6ZXIiLCJjbiI6IlBpbmsgR2xhemVyIiwiZXMiOiJQaW5rIEdsYXplciIsInB0IjoiUGluayBHbGF6ZXIifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJSYWRpYXRpbmcgd2l0aCBhIHNvZnQgeWV0IGNhcHRpdmF0aW5nIGh1ZSwgYWRkcyBhIHRvdWNoIG9mIHNvcGhpc3RpY2F0aW9uIGFuZCBhbGx1cmUgdG8gdGhlIHJlYWxtIG9mIGNyeXB0byBtaW5pbmcsIEJ5IEthaXpha2kiLCJjbiI6IlJhZGlhdGluZyB3aXRoIGEgc29mdCB5ZXQgY2FwdGl2YXRpbmcgaHVlLCBhZGRzIGEgdG91Y2ggb2Ygc29waGlzdGljYXRpb24gYW5kIGFsbHVyZSB0byB0aGUgcmVhbG0gb2YgY3J5cHRvIG1pbmluZywgQnkgS2FpemFraSIsImVzIjoiUmFkaWF0aW5nIHdpdGggYSBzb2Z0IHlldCBjYXB0aXZhdGluZyBodWUsIGFkZHMgYSB0b3VjaCBvZiBzb3BoaXN0aWNhdGlvbiBhbmQgYWxsdXJlIHRvIHRoZSByZWFsbSBvZiBjcnlwdG8gbWluaW5nLCBCeSBLYWl6YWtpIiwicHQiOiJSYWRpYXRpbmcgd2l0aCBhIHNvZnQgeWV0IGNhcHRpdmF0aW5nIGh1ZSwgYWRkcyBhIHRvdWNoIG9mIHNvcGhpc3RpY2F0aW9uIGFuZCBhbGx1cmUgdG8gdGhlIHJlYWxtIG9mIGNyeXB0byBtaW5pbmcsIEJ5IEthaXpha2kifSwiY3JlYXRlZF9ieV90aXRsZSI6eyJsaW5rIjoiIiwidGV4dCI6IiJ9LCJsZXZlbCI6MCwidHlwZSI6ImJhc2ljIiwiZmlsZW5hbWUiOiJwaW5rX2dsYXplciIsImlzX2Nhbl9iZV9zb2xkX29uX21wIjp0cnVlLCJib251cyI6MCwiaXNfaW5fc2V0IjpmYWxzZX19LHsiaWQiOiI2NzI5MzlhMGEyNmMzN2MzMGZkODhmYjMiLCJpdGVtX2lkIjoiNjQ0YmJlY2U2NDgyOTRiNDY0MmYzNjk3IiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MTAsInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjY0NGJiZWNlNjQ4Mjk0YjQ2NDJmMzY5NyIsInBvd2VyIjoyMjAwMDAsIndpZHRoIjoyLCJuYW1lIjp7ImVuIjoiTml0cm8gTm9tYWQiLCJjbiI6Ik5pdHJvIE5vbWFkIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiQ2hyb21lIGZpbmlzaCwgc2t1bGwgbW90aWZzLCBhbmQgZmxhbWVzIGFkb3JuaW5nIGl0cyBmcmFtZSBhcmUgc3VyZSB0byB0dXJuIGhlYWRzLCB3aGlsZSBpdHMgaGlnaC1vY3RhbmUsIG5pdHJvdXMtYm9vc3RlZCBkZXNpZ24gd2lsbCBsZWF2ZSB0aGUgY29tcGV0aXRpb24gaW4gdGhlIGR1c3Qg4oCUIHNvIHJpZGUgaW4gc3R5bGUgd2l0aCBOaXRybyBOb21hZCwgdGhlIHVsdGltYXRlIGNob2ljZSBmb3IgaGlnaC1wZXJmb3JtYW5jZSBjcnlwdG9jdXJyZW5jeSBtaW5pbmcgb24gdGhlIGdvISBDcmVhdGVkIGJ5RGVhbiBXYWx0ZXIiLCJjbiI6IkNocm9tZSBmaW5pc2gsIHNrdWxsIG1vdGlmcywgYW5kIGZsYW1lcyBhZG9ybmluZyBpdHMgZnJhbWUgYXJlIHN1cmUgdG8gdHVybiBoZWFkcywgd2hpbGUgaXRzIGhpZ2gtb2N0YW5lLCBuaXRyb3VzLWJvb3N0ZWQgZGVzaWduIHdpbGwgbGVhdmUgdGhlIGNvbXBldGl0aW9uIGluIHRoZSBkdXN0IOKAlCBzbyByaWRlIGluIHN0eWxlIHdpdGggTml0cm8gTm9tYWQsIHRoZSB1bHRpbWF0ZSBjaG9pY2UgZm9yIGhpZ2gtcGVyZm9ybWFuY2UgY3J5cHRvY3VycmVuY3kgbWluaW5nIG9uIHRoZSBnbyEgQ3JlYXRlZCBieURlYW4gV2FsdGVyIn0sImNyZWF0ZWRfYnlfdGl0bGUiOnsidGV4dCI6IkRlYW4gV2FsdGVyIiwibGluayI6IiJ9LCJsZXZlbCI6MCwidHlwZSI6ImJhc2ljIiwiZmlsZW5hbWUiOiJuaXRyb19ub21hZCIsImlzX2Nhbl9iZV9zb2xkX29uX21wIjp0cnVlLCJib251cyI6MjUsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjcyOTM5YTBhMjZjMzdjMzBmZDg4ZmI4IiwiaXRlbV9pZCI6IjY0NDkwZjgzNTQ3Y2ZhYjlhMjczYzg5NCIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjExLCJ0eXBlIjoicmFjayIsInRpdGxlIjp7ImVuIjoiUmFjayBUaXRsZSIsImNuIjoiUmFjayBUaXRsZSJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6IlJhY2sgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJSYWNrIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Im5hbWUiOnsiZW4iOiJGdXJ5IFJhY2sgOCIsImNuIjoiRnVyeSBSYWNrIDgifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJXaXRoIGVpZ2h0IHNsb3RzIGFuZCBhIGJvbnVzIHBvd2VyIG9mIDMlLCB0aGlzIHJhY2sgcHJvdmlkZXMgYSBib29zdCB0byB5b3VyIG1pbmluZyBvcGVyYXRpb24sIGFuZCBpdHMgc3RyaWtpbmcgZGVzaWduIGlzIHdoYXQgdHJ1bHkgc2V0cyBpdCBhcGFydCEgV2hldGhlciB5b3UncmUgYSBmYW4gb2YgRnVyeSBSb2FkIHZpYmUsIG9yIHlvdeKAmXJlIHNpbXBseSBpbnRvIG1pbmluZywgdGhlIEZ1cnkgUmFjayA4IGlzIHN1cmUgdG8gaW1wcmVzcyEiLCJjbiI6IldpdGggZWlnaHQgc2xvdHMgYW5kIGEgYm9udXMgcG93ZXIgb2YgMyUsIHRoaXMgcmFjayBwcm92aWRlcyBhIGJvb3N0IHRvIHlvdXIgbWluaW5nIG9wZXJhdGlvbiwgYW5kIGl0cyBzdHJpa2luZyBkZXNpZ24gaXMgd2hhdCB0cnVseSBzZXRzIGl0IGFwYXJ0ISBXaGV0aGVyIHlvdSdyZSBhIGZhbiBvZiBGdXJ5IFJvYWQgdmliZSwgb3IgeW914oCZcmUgc2ltcGx5IGludG8gbWluaW5nLCB0aGUgRnVyeSBSYWNrIDggaXMgc3VyZSB0byBpbXByZXNzISJ9LCJfaWQiOiI2NDQ5MGY4MzU0N2NmYWI5YTI3M2M4OTQiLCJjYXBhY2l0eSI6OCwiaXNfaW5fc2V0IjpmYWxzZX19LHsiaWQiOiI2NzI5MzlhMGEyNmMzN2MzMGZkODhmYmMiLCJpdGVtX2lkIjoiNjYxNDY2ZTFkNmMzMjJhNmM3YzM0NTA0IiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MTIsInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjY2MTQ2NmUxZDZjMzIyYTZjN2MzNDUwNCIsInBvd2VyIjozNzgwMDAsIndpZHRoIjoyLCJuYW1lIjp7ImVuIjoiTmVvbkd1ZXJpbGxhIiwiY24iOiJOZW9uR3VlcmlsbGEiLCJlcyI6Ik5lb25HdWVyaWxsYSIsInB0IjoiTmVvbkd1ZXJpbGxhIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiU21lbGxzIGxpa2UgbWluaW5nIHNwaXJpdCEgV2l0aCBpdHMgZXhwZXJpbWVudGFsIHNvdW5kcyBhbmQgb2ZmYmVhdCBzdHlsZSwgaXTigJlzIGhlcmUgdG8gY2hhbGxlbmdlIGNvbnZlbnRpb24gYW5kIHJvY2sgeW91ciBjcnlwdG8gd29ybGQuIiwiY24iOiJTbWVsbHMgbGlrZSBtaW5pbmcgc3Bpcml0ISBXaXRoIGl0cyBleHBlcmltZW50YWwgc291bmRzIGFuZCBvZmZiZWF0IHN0eWxlLCBpdOKAmXMgaGVyZSB0byBjaGFsbGVuZ2UgY29udmVudGlvbiBhbmQgcm9jayB5b3VyIGNyeXB0byB3b3JsZC4iLCJlcyI6IlNtZWxscyBsaWtlIG1pbmluZyBzcGlyaXQhIFdpdGggaXRzIGV4cGVyaW1lbnRhbCBzb3VuZHMgYW5kIG9mZmJlYXQgc3R5bGUsIGl04oCZcyBoZXJlIHRvIGNoYWxsZW5nZSBjb252ZW50aW9uIGFuZCByb2NrIHlvdXIgY3J5cHRvIHdvcmxkLiIsInB0IjoiU21lbGxzIGxpa2UgbWluaW5nIHNwaXJpdCEgV2l0aCBpdHMgZXhwZXJpbWVudGFsIHNvdW5kcyBhbmQgb2ZmYmVhdCBzdHlsZSwgaXTigJlzIGhlcmUgdG8gY2hhbGxlbmdlIGNvbnZlbnRpb24gYW5kIHJvY2sgeW91ciBjcnlwdG8gd29ybGQuIn0sImNyZWF0ZWRfYnlfdGl0bGUiOnsibGluayI6IiIsInRleHQiOiIifSwibGV2ZWwiOjAsInR5cGUiOiJiYXNpYyIsImZpbGVuYW1lIjoibmVvbmd1ZXJpbGxhIiwiaXNfY2FuX2JlX3NvbGRfb25fbXAiOnRydWUsImJvbnVzIjoxNSwiaXNfaW5fc2V0IjpmYWxzZX19LHsiaWQiOiI2NzI5MzlhMGEyNmMzN2MzMGZkODhmYzAiLCJpdGVtX2lkIjpudWxsLCJhbW91bnQiOjIwMDAwMDAwMCwiY3VycmVuY3kiOiJSU1QiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjEzLCJ0eXBlIjoibW9uZXkiLCJ0aXRsZSI6eyJlbiI6Ik1vbmV5IFRpdGxlIiwiY24iOiJNb25leSBUaXRsZSJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6Ik1vbmV5IFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiTW9uZXkgUmV3YXJkIERlc2NyaXB0aW9uIn19LHsiaWQiOiI2NzI5MzlhMGEyNmMzN2MzMGZkODhmYzQiLCJpdGVtX2lkIjoiNjQ1YjhhODdlY2NkM2M0MzIwNzQ3NGQwIiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MTQsInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjY0NWI4YTg3ZWNjZDNjNDMyMDc0NzRkMCIsInBvd2VyIjoxNDkwMDAsIndpZHRoIjoyLCJuYW1lIjp7ImVuIjoiRmlyZSBGb3JnZXIiLCJjbiI6IkZpcmUgRm9yZ2VyIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiV2l0aCBpdHMgYmxhemluZyBoZWF0IGFuZCBwcmVjaXNlIGNvbnRyb2wsIHRoZSBGaXJlIEZvcmdlciBpcyBjYXBhYmxlIG9mIHR1cm5pbmcgZXZlbiB0aGUgbW9zdCBzdHViYm9ybiBvcmVzIGludG8gcHVyZSBjcnlwdG8gcHJvZml0cyEgQ3JlYXRlZCBieUNsYXV4dGVyIiwiY24iOiJXaXRoIGl0cyBibGF6aW5nIGhlYXQgYW5kIHByZWNpc2UgY29udHJvbCwgdGhlIEZpcmUgRm9yZ2VyIGlzIGNhcGFibGUgb2YgdHVybmluZyBldmVuIHRoZSBtb3N0IHN0dWJib3JuIG9yZXMgaW50byBwdXJlIGNyeXB0byBwcm9maXRzISBDcmVhdGVkIGJ5Q2xhdXh0ZXIifSwiY3JlYXRlZF9ieV90aXRsZSI6eyJ0ZXh0IjoiQ2xhdXh0ZXIiLCJsaW5rIjoiIn0sImxldmVsIjowLCJ0eXBlIjoiYmFzaWMiLCJmaWxlbmFtZSI6ImZpcmVfZm9yZ2VyIiwiaXNfY2FuX2JlX3NvbGRfb25fbXAiOnRydWUsImJvbnVzIjo1MCwiaXNfaW5fc2V0IjpmYWxzZX19LHsiaWQiOiI2NzI5MzlhMGEyNmMzN2MzMGZkODhmYzgiLCJpdGVtX2lkIjoiNjRiZDAyYzQ1MzllNmUzMDM2ODliMThkIiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MTUsInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjY0YmQwMmM0NTM5ZTZlMzAzNjg5YjE4ZCIsInBvd2VyIjoyNjYwMDAsIndpZHRoIjoyLCJuYW1lIjp7ImVuIjoiU3luYXB0aWMgUHVsc2UiLCJjbiI6IlN5bmFwdGljIFB1bHNlIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiRXhwZXJpZW5jZSB0aGUgcHVsc2F0aW5nIHJoeXRobXMgb2YgTWlhbWkncyByZXRyby13YXZlIHNjZW5lIHdpdGggdGhlIFN5bmFwdGljIFB1bHNlIE1pbmVyLiBJdHMgaHlwbm90aWMgdmlzdWFscyBhbmQgc3luY2hyb25pemVkIGJlYXRzIGNyZWF0ZSBhIHN5bmVyZ3kgdGhhdCBhbXBsaWZpZXMgeW91ciBjcnlwdG8gbWluaW5nIGNhcGFiaWxpdGllcy4gQnlBc21pdGEiLCJjbiI6IkV4cGVyaWVuY2UgdGhlIHB1bHNhdGluZyByaHl0aG1zIG9mIE1pYW1pJ3MgcmV0cm8td2F2ZSBzY2VuZSB3aXRoIHRoZSBTeW5hcHRpYyBQdWxzZSBNaW5lci4gSXRzIGh5cG5vdGljIHZpc3VhbHMgYW5kIHN5bmNocm9uaXplZCBiZWF0cyBjcmVhdGUgYSBzeW5lcmd5IHRoYXQgYW1wbGlmaWVzIHlvdXIgY3J5cHRvIG1pbmluZyBjYXBhYmlsaXRpZXMuIEJ5QXNtaXRhIn0sImNyZWF0ZWRfYnlfdGl0bGUiOnsibGluayI6IiIsInRleHQiOiJBc21pdGEifSwibGV2ZWwiOjAsInR5cGUiOiJiYXNpYyIsImZpbGVuYW1lIjoic3luYXB0aWNfcHVsc2UiLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6dHJ1ZSwiYm9udXMiOjIwMCwiaXNfaW5fc2V0IjpmYWxzZX19LHsiaWQiOiI2NzI5MzlhMGEyNmMzN2MzMGZkODhmY2YiLCJpdGVtX2lkIjoiNjQyNDEyOTIxMGY5MjUxZWVlMjdkN2E5IiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MTYsInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjY0MjQxMjkyMTBmOTI1MWVlZTI3ZDdhOSIsInBvd2VyIjo1NDEwNjUsIndpZHRoIjoyLCJuYW1lIjp7ImVuIjoiTml0cm8tTWluZSIsImNuIjoiTml0cm8tTWluZSJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6IlVubGVhc2ggdGhlIGV4cGxvc2l2ZSBwb3dlciBvZiB0aGUgTml0cm8tTWluZSBhbmQgd2F0Y2ggeW91ciBwcm9maXRzIHNvYXIhIERyaWZ0IHRocm91Z2ggdGhlIFNlYXNvbiBRdWVzdHMgdG8gZ2V0IHlvdXIgTml0cm8gQm9vc3QhIiwiY24iOiJVbmxlYXNoIHRoZSBleHBsb3NpdmUgcG93ZXIgb2YgdGhlIE5pdHJvLU1pbmUgYW5kIHdhdGNoIHlvdXIgcHJvZml0cyBzb2FyISBEcmlmdCB0aHJvdWdoIHRoZSBTZWFzb24gUXVlc3RzIHRvIGdldCB5b3VyIE5pdHJvIEJvb3N0ISJ9LCJjcmVhdGVkX2J5X3RpdGxlIjp7ImxpbmsiOiIiLCJ0ZXh0IjoiIn0sImxldmVsIjoyLCJ0eXBlIjoibWVyZ2UiLCJmaWxlbmFtZSI6Im5pdHJvX21pbmUiLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6dHJ1ZSwiYm9udXMiOjE2NiwiaXNfaW5fc2V0IjpmYWxzZX19LHsiaWQiOiI2NzI5MzlhMGEyNmMzN2MzMGZkODhmZDMiLCJpdGVtX2lkIjpudWxsLCJhbW91bnQiOjUwMDAwMDAsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjYwNDgwMDAwMCwicmVxdWlyZWRfbGV2ZWwiOjE3LCJ0eXBlIjoicG93ZXIiLCJ0aXRsZSI6eyJlbiI6IlBvd2VyIiwiY24iOiJQb3dlciJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6IlBvd2VyIFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiUG93ZXIgUmV3YXJkIERlc2NyaXB0aW9uIn19LHsiaWQiOiI2NzI5MzlhMGEyNmMzN2MzMGZkODhmZDciLCJpdGVtX2lkIjpudWxsLCJhbW91bnQiOjQwMDAwMDAwMCwiY3VycmVuY3kiOiJSU1QiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjE4LCJ0eXBlIjoibW9uZXkiLCJ0aXRsZSI6eyJlbiI6Ik1vbmV5IFRpdGxlIiwiY24iOiJNb25leSBUaXRsZSJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6Ik1vbmV5IFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiTW9uZXkgUmV3YXJkIERlc2NyaXB0aW9uIn19LHsiaWQiOiI2NzI5MzlhMGEyNmMzN2MzMGZkODhmZGIiLCJpdGVtX2lkIjoiNjYxNDY3MDNkNmMzMjJhNmM3YzM0NTRkIiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MTksInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjY2MTQ2NzAzZDZjMzIyYTZjN2MzNDU0ZCIsInBvd2VyIjo0MDMwMDAsIndpZHRoIjoyLCJuYW1lIjp7ImVuIjoiTWNDYXJ0bmV5J3MgQ3J5cHRvUmlmZiIsImNuIjoiTWNDYXJ0bmV5J3MgQ3J5cHRvUmlmZiIsImVzIjoiTWNDYXJ0bmV5J3MgQ3J5cHRvUmlmZiIsInB0IjoiTWNDYXJ0bmV5J3MgQ3J5cHRvUmlmZiJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6IkNvbWUgdG9nZXRoZXIsIHJpZ2h0IG5vdywgYW5kIGxldOKAmXMgbWluZSEiLCJjbiI6IkNvbWUgdG9nZXRoZXIsIHJpZ2h0IG5vdywgYW5kIGxldOKAmXMgbWluZSEiLCJlcyI6IkNvbWUgdG9nZXRoZXIsIHJpZ2h0IG5vdywgYW5kIGxldOKAmXMgbWluZSEiLCJwdCI6IkNvbWUgdG9nZXRoZXIsIHJpZ2h0IG5vdywgYW5kIGxldOKAmXMgbWluZSEifSwiY3JlYXRlZF9ieV90aXRsZSI6eyJsaW5rIjoiIiwidGV4dCI6IiJ9LCJsZXZlbCI6MCwidHlwZSI6ImJhc2ljIiwiZmlsZW5hbWUiOiJtY2NhcnRuZXlzX2NyeXB0b3JpZmYiLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6dHJ1ZSwiYm9udXMiOjE1LCJpc19pbl9zZXQiOmZhbHNlfX0seyJpZCI6IjY3MjkzOWEwYTI2YzM3YzMwZmQ4OGZlMCIsIml0ZW1faWQiOiI2NTcwYTBiMTNjNDYxMTk1NzMyM2UxNzciLCJhbW91bnQiOjEsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjoyMCwidHlwZSI6Im1pbmVyIiwidGl0bGUiOnsiZW4iOiJNaW5lciBSZXdhcmQiLCJjbiI6Ik1pbmVyIFJld2FyZCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIn0sIml0ZW0iOnsiX2lkIjoiNjU3MGEwYjEzYzQ2MTE5NTczMjNlMTc3IiwicG93ZXIiOjcxNzUwMCwid2lkdGgiOjIsIm5hbWUiOnsiZW4iOiJKaW5nbGVHcm9vdmVHcmFtIiwiY24iOiJKaW5nbGVHcm9vdmVHcmFtIiwiZXMiOiJKaW5nbGVHcm9vdmVHcmFtIiwicHQiOiJKaW5nbGVHcm9vdmVHcmFtIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiSmluZ2xlR3Jvb3ZlR3JhbSwgbWluaW5nIGFsbCB0aGUgd2F5LCBGYS1sYS1sYS1sYS1sYSwgbGV0IHRoZSBjcnlwdG8gdHJlYXN1cmVzIHN3YXkuIFNwaW5uaW5nIHR1bmVzIG9mIGpveSwgaW4gdGhlIGJsb2NrY2hhaW4ncyBoYWxsLCAnVGlzIHRoZSBzZWFzb24ncyBtZWxvZHksIGhlYXIgdGhlIEppbmdsZUdyb292ZUdyYW0gY2FsbC4iLCJjbiI6IkppbmdsZUdyb292ZUdyYW0sIG1pbmluZyBhbGwgdGhlIHdheSwgRmEtbGEtbGEtbGEtbGEsIGxldCB0aGUgY3J5cHRvIHRyZWFzdXJlcyBzd2F5LiBTcGlubmluZyB0dW5lcyBvZiBqb3ksIGluIHRoZSBibG9ja2NoYWluJ3MgaGFsbCwgJ1RpcyB0aGUgc2Vhc29uJ3MgbWVsb2R5LCBoZWFyIHRoZSBKaW5nbGVHcm9vdmVHcmFtIGNhbGwuIiwiZXMiOiJKaW5nbGVHcm9vdmVHcmFtLCBtaW5pbmcgYWxsIHRoZSB3YXksIEZhLWxhLWxhLWxhLWxhLCBsZXQgdGhlIGNyeXB0byB0cmVhc3VyZXMgc3dheS4gU3Bpbm5pbmcgdHVuZXMgb2Ygam95LCBpbiB0aGUgYmxvY2tjaGFpbidzIGhhbGwsICdUaXMgdGhlIHNlYXNvbidzIG1lbG9keSwgaGVhciB0aGUgSmluZ2xlR3Jvb3ZlR3JhbSBjYWxsLiIsInB0IjoiU2xlaWdoUmlkZSwgZ2xpZGluZyB0aHJvdWdoIHRoZSBjb2RlLCBPbiBhIHdpbnRlciBqb3VybmV5LCBhIG1pbmVyJ3Mgb2RlLiBNZWNoYW5pY2FsIHdvbmRlcnMgaW4gYSBkaWdpdGFsIGRhbmNlLCBQb2xhciBiZWFyIGxlYWRzLCBhIG1lcnJ5IGFkdmFuY2UuIn0sImNyZWF0ZWRfYnlfdGl0bGUiOnsibGluayI6IiIsInRleHQiOiIifSwibGV2ZWwiOjAsInR5cGUiOiJiYXNpYyIsImZpbGVuYW1lIjoiamluZ2xlZ3Jvb3ZlZ3JhbSIsImlzX2Nhbl9iZV9zb2xkX29uX21wIjp0cnVlLCJib251cyI6NzUsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjcyOTM5YTFhMjZjMzdjMzBmZDg4ZmU1IiwiaXRlbV9pZCI6IjY0NDkwZmMxNTQ3Y2ZhYjlhMjc1OTYzOCIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjIxLCJ0eXBlIjoicmFjayIsInRpdGxlIjp7ImVuIjoiUmFjayBUaXRsZSIsImNuIjoiUmFjayBUaXRsZSJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6IlJhY2sgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJSYWNrIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Im5hbWUiOnsiZW4iOiJCaW9oYXphcmQgUmFjayA4IiwiY24iOiJCaW9oYXphcmQgUmFjayA4In0sImRlc2NyaXB0aW9uIjp7ImVuIjoiVGhlIEJpb2hhemFyZCBSYWNrIDggaXMgYSBmZWFyc29tZSBzaWdodCB0byBiZWhvbGQsIHdpdGggaXRzIGVpZ2h0IGdsb3dpbmcgc2xvdHMgYW5kIGRhbmdlcm91cy1sb29raW5nIGRlc2lnbi4gSXQgcHJvdmlkZXMgYSBib251cyBwb3dlciBvZiA1JSwgd2hpY2ggYWxsb3dzIHlvdSB0byBtaW5lIG1vcmUgY3J5cHRvY3VycmVuY3kgdGhhbiBldmVyIGJlZm9yZSEgSnVzdCBkb24ndCBnZXQgdG9vIGNsb3NlIC0gdGhpcyByYWNrIG1lYW5zIGJ1c2luZXNzLiIsImNuIjoiVGhlIEJpb2hhemFyZCBSYWNrIDggaXMgYSBmZWFyc29tZSBzaWdodCB0byBiZWhvbGQsIHdpdGggaXRzIGVpZ2h0IGdsb3dpbmcgc2xvdHMgYW5kIGRhbmdlcm91cy1sb29raW5nIGRlc2lnbi4gSXQgcHJvdmlkZXMgYSBib251cyBwb3dlciBvZiA1JSwgd2hpY2ggYWxsb3dzIHlvdSB0byBtaW5lIG1vcmUgY3J5cHRvY3VycmVuY3kgdGhhbiBldmVyIGJlZm9yZSEgSnVzdCBkb24ndCBnZXQgdG9vIGNsb3NlIC0gdGhpcyByYWNrIG1lYW5zIGJ1c2luZXNzLiJ9LCJfaWQiOiI2NDQ5MGZjMTU0N2NmYWI5YTI3NTk2MzgiLCJjYXBhY2l0eSI6OCwiaXNfaW5fc2V0IjpmYWxzZX19LHsiaWQiOiI2NzI5MzlhMWEyNmMzN2MzMGZkODhmZWIiLCJpdGVtX2lkIjoiNjUwMTk4NDMyMjE2ZTE4NDFlYmFiMDY5IiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MjIsInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjY1MDE5ODQzMjIxNmUxODQxZWJhYjA2OSIsInBvd2VyIjozMzYwMDAsIndpZHRoIjoyLCJuYW1lIjp7ImVuIjoiTmVvbiBDaXR5IiwiY24iOiJOZW9uIENpdHkiLCJlcyI6Ik5lb24gQ2l0eSIsInB0IjoiTmVvbiBDaXR5In0sImRlc2NyaXB0aW9uIjp7ImVuIjoiRW1icmFjaW5nIE1pYW1pJ3MgJzgwcyB2aWJlcyBhbmQgZ2xhbW9yb3VzIG5pZ2h0bGlmZSBpbiBzdHlsZS4gQnkgT3N3YWxkbyBEb21pbmdvIiwiY24iOiJFbWJyYWNpbmcgTWlhbWkncyAnODBzIHZpYmVzIGFuZCBnbGFtb3JvdXMgbmlnaHRsaWZlIGluIHN0eWxlLiBCeSBPc3dhbGRvIERvbWluZ28iLCJlcyI6IkVtYnJhY2luZyBNaWFtaSdzICc4MHMgdmliZXMgYW5kIGdsYW1vcm91cyBuaWdodGxpZmUgaW4gc3R5bGUuIEJ5IE9zd2FsZG8gRG9taW5nbyIsInB0IjoiRW1icmFjaW5nIE1pYW1pJ3MgJzgwcyB2aWJlcyBhbmQgZ2xhbW9yb3VzIG5pZ2h0bGlmZSBpbiBzdHlsZS4gQnkgT3N3YWxkbyBEb21pbmdvIn0sImNyZWF0ZWRfYnlfdGl0bGUiOnsibGluayI6IiIsInRleHQiOiIifSwibGV2ZWwiOjAsInR5cGUiOiJiYXNpYyIsImZpbGVuYW1lIjoibmVvbl9jaXR5IiwiaXNfY2FuX2JlX3NvbGRfb25fbXAiOnRydWUsImJvbnVzIjo1MCwiaXNfaW5fc2V0IjpmYWxzZX19LHsiaWQiOiI2NzI5MzlhMWEyNmMzN2MzMGZkODhmZWYiLCJpdGVtX2lkIjoiNjQ1YjhhODdlY2NkM2M0MzIwNzQ3NGQyIiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MjMsInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjY0NWI4YTg3ZWNjZDNjNDMyMDc0NzRkMiIsInBvd2VyIjo2OTAwMDAsIndpZHRoIjoyLCJuYW1lIjp7ImVuIjoiRnVycnkgUm9ja2VyIiwiY24iOiJGdXJyeSBSb2NrZXIifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJGdXJyeSBSb2NrZXIgaXMgYSByb2Nrc3RhciBhbmQgYSBwb3N0LWFwb2NhbHlwdGljIHdhcnJpb3IuIEhlJ3MgYWx3YXlzIHJlYWR5IHRvIHJvY2sgYW5kIHJvbGwgaW4gdGhlIHdhc3RlbGFuZDogaGlzIG11c2ljIGFzIGEgd2VhcG9uLCByYWxseWluZyBoaXMgZmVsbG93IG1pbmVycyB0byBmaWdodCBhZ2FpbnN0IHRoZSBkYW5nZXJzIG9mIHRoZSBwb3N0LWFwb2NhbHlwdGljIHdvcmxkLiBDcmVhdGVkIGJ5UmF2ZWxsIiwiY24iOiJGdXJyeSBSb2NrZXIgaXMgYSByb2Nrc3RhciBhbmQgYSBwb3N0LWFwb2NhbHlwdGljIHdhcnJpb3IuIEhlJ3MgYWx3YXlzIHJlYWR5IHRvIHJvY2sgYW5kIHJvbGwgaW4gdGhlIHdhc3RlbGFuZDogaGlzIG11c2ljIGFzIGEgd2VhcG9uLCByYWxseWluZyBoaXMgZmVsbG93IG1pbmVycyB0byBmaWdodCBhZ2FpbnN0IHRoZSBkYW5nZXJzIG9mIHRoZSBwb3N0LWFwb2NhbHlwdGljIHdvcmxkLiBDcmVhdGVkIGJ5UmF2ZWxsIn0sImNyZWF0ZWRfYnlfdGl0bGUiOnsidGV4dCI6IlJhdmVsbCIsImxpbmsiOiIifSwibGV2ZWwiOjAsInR5cGUiOiJiYXNpYyIsImZpbGVuYW1lIjoiZnVycnlfcm9ja2VyIiwiaXNfY2FuX2JlX3NvbGRfb25fbXAiOnRydWUsImJvbnVzIjoxNTAsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjcyOTM5YTFhMjZjMzdjMzBmZDg4ZmYzIiwiaXRlbV9pZCI6IjY2MTQ2ODY4ZDZjMzIyYTZjN2MzNDc2ZCIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjI0LCJ0eXBlIjoibWluZXIiLCJ0aXRsZSI6eyJlbiI6Ik1pbmVyIFJld2FyZCIsImNuIjoiTWluZXIgUmV3YXJkIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24ifSwiaXRlbSI6eyJfaWQiOiI2NjE0Njg2OGQ2YzMyMmE2YzdjMzQ3NmQiLCJwb3dlciI6MTc2NDAwMCwid2lkdGgiOjIsIm5hbWUiOnsiZW4iOiJTeW50aG8gS2V5cyIsImNuIjoiU3ludGhvIEtleXMiLCJlcyI6IlN5bnRobyBLZXlzIiwicHQiOiJTeW50aG8gS2V5cyJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6IlB1bHNhdGluZyBiZWF0cyBhbmQgZWxlY3RyaWZ5aW5nIHR1bmVzLCB5b3UgYXJlIGhlcmUgdG8gbWFrZSBzdXJlIHRoZSBwYXJ0eSBuZXZlciBzdG9wcyEiLCJjbiI6IlB1bHNhdGluZyBiZWF0cyBhbmQgZWxlY3RyaWZ5aW5nIHR1bmVzLCB5b3UgYXJlIGhlcmUgdG8gbWFrZSBzdXJlIHRoZSBwYXJ0eSBuZXZlciBzdG9wcyEiLCJlcyI6IlB1bHNhdGluZyBiZWF0cyBhbmQgZWxlY3RyaWZ5aW5nIHR1bmVzLCB5b3UgYXJlIGhlcmUgdG8gbWFrZSBzdXJlIHRoZSBwYXJ0eSBuZXZlciBzdG9wcyEiLCJwdCI6IlB1bHNhdGluZyBiZWF0cyBhbmQgZWxlY3RyaWZ5aW5nIHR1bmVzLCB5b3UgYXJlIGhlcmUgdG8gbWFrZSBzdXJlIHRoZSBwYXJ0eSBuZXZlciBzdG9wcyEifSwiY3JlYXRlZF9ieV90aXRsZSI6eyJsaW5rIjoiIiwidGV4dCI6IiJ9LCJsZXZlbCI6MCwidHlwZSI6ImJhc2ljIiwiZmlsZW5hbWUiOiJzeW50aG9fa2V5cyIsImlzX2Nhbl9iZV9zb2xkX29uX21wIjp0cnVlLCJib251cyI6NTAsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjcyOTM5YTFhMjZjMzdjMzBmZDg4ZmY3IiwiaXRlbV9pZCI6IjY3MjM5YzhlMTEzNzczOTFhMGNjYzdjNiIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjI1LCJ0eXBlIjoibWluZXIiLCJ0aXRsZSI6eyJlbiI6Ik1pbmVyIFJld2FyZCIsImNuIjoiTWluZXIgUmV3YXJkIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24ifSwiaXRlbSI6eyJfaWQiOiI2NzIzOWM4ZTExMzc3MzkxYTBjY2M3YzYiLCJwb3dlciI6NjUwMDAwMCwid2lkdGgiOjIsIm5hbWUiOnsiZW4iOiJCYXNzJ24nTWluZSIsImNuIjoiQmFzcyduJ01pbmUiLCJlcyI6IkJhc3MnbidNaW5lIiwicHQiOiJCYXNzJ24nTWluZSJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6IkZ1ZWxlZCBieSBwdXJlIG1vbWVudHVtLCB0aGlzIG1pbmVyIGNoYXJnZXMgdGhyb3VnaCBibG9ja3Mgd2l0aCB0aGUgaW50ZW5zaXR5IG9mIGEgcG93ZXJmdWwgcmh5dGhtLCB0cmFuc2Zvcm1pbmcgcG90ZW50aWFsIGludG8gc3RlYWR5IHN0cmVhbXMgb2YgcmV3YXJkLiIsImNuIjoiRnVlbGVkIGJ5IHB1cmUgbW9tZW50dW0sIHRoaXMgbWluZXIgY2hhcmdlcyB0aHJvdWdoIGJsb2NrcyB3aXRoIHRoZSBpbnRlbnNpdHkgb2YgYSBwb3dlcmZ1bCByaHl0aG0sIHRyYW5zZm9ybWluZyBwb3RlbnRpYWwgaW50byBzdGVhZHkgc3RyZWFtcyBvZiByZXdhcmQuIiwiZXMiOiJGdWVsZWQgYnkgcHVyZSBtb21lbnR1bSwgdGhpcyBtaW5lciBjaGFyZ2VzIHRocm91Z2ggYmxvY2tzIHdpdGggdGhlIGludGVuc2l0eSBvZiBhIHBvd2VyZnVsIHJoeXRobSwgdHJhbnNmb3JtaW5nIHBvdGVudGlhbCBpbnRvIHN0ZWFkeSBzdHJlYW1zIG9mIHJld2FyZC4iLCJwdCI6IkZ1ZWxlZCBieSBwdXJlIG1vbWVudHVtLCB0aGlzIG1pbmVyIGNoYXJnZXMgdGhyb3VnaCBibG9ja3Mgd2l0aCB0aGUgaW50ZW5zaXR5IG9mIGEgcG93ZXJmdWwgcmh5dGhtLCB0cmFuc2Zvcm1pbmcgcG90ZW50aWFsIGludG8gc3RlYWR5IHN0cmVhbXMgb2YgcmV3YXJkLiJ9LCJjcmVhdGVkX2J5X3RpdGxlIjp7ImxpbmsiOiIiLCJ0ZXh0IjoiIn0sImxldmVsIjowLCJ0eXBlIjoiYmFzaWMiLCJmaWxlbmFtZSI6ImJhc3NubWluZSIsImlzX2Nhbl9iZV9zb2xkX29uX21wIjpmYWxzZSwiYm9udXMiOjM1MCwiaXNfaW5fc2V0IjpmYWxzZX19XSwibGV2ZWxzX2NvbmZpZyI6W3sibGV2ZWwiOjEsImxldmVsX3hwIjoyMDAwLCJyZXF1aXJlZF94cCI6MjAwMH0seyJsZXZlbCI6MiwibGV2ZWxfeHAiOjUwMDAsInJlcXVpcmVkX3hwIjo3MDAwfSx7ImxldmVsIjozLCJsZXZlbF94cCI6ODAwMCwicmVxdWlyZWRfeHAiOjE1MDAwfSx7ImxldmVsIjo0LCJsZXZlbF94cCI6MjQwMDAsInJlcXVpcmVkX3hwIjozOTAwMH0seyJsZXZlbCI6NSwibGV2ZWxfeHAiOjYwMDAsInJlcXVpcmVkX3hwIjo0NTAwMH0seyJsZXZlbCI6NiwibGV2ZWxfeHAiOjE1MDAwLCJyZXF1aXJlZF94cCI6NjAwMDB9LHsibGV2ZWwiOjcsImxldmVsX3hwIjoxODAwMCwicmVxdWlyZWRfeHAiOjc4MDAwfSx7ImxldmVsIjo4LCJsZXZlbF94cCI6NTMwMDAsInJlcXVpcmVkX3hwIjoxMzEwMDB9LHsibGV2ZWwiOjksImxldmVsX3hwIjo1MDAwMCwicmVxdWlyZWRfeHAiOjE4MTAwMH0seyJsZXZlbCI6MTAsImxldmVsX3hwIjoxNjAwMDAsInJlcXVpcmVkX3hwIjozNDEwMDB9LHsibGV2ZWwiOjExLCJsZXZlbF94cCI6MTcwMDAwLCJyZXF1aXJlZF94cCI6NTExMDAwfSx7ImxldmVsIjoxMiwibGV2ZWxfeHAiOjM2MDAwMCwicmVxdWlyZWRfeHAiOjg3MTAwMH0seyJsZXZlbCI6MTMsImxldmVsX3hwIjo5MDAwMCwicmVxdWlyZWRfeHAiOjk2MTAwMH0seyJsZXZlbCI6MTQsImxldmVsX3hwIjoyMjAwMDAsInJlcXVpcmVkX3hwIjoxMTgxMDAwfSx7ImxldmVsIjoxNSwibGV2ZWxfeHAiOjI0MDAwMCwicmVxdWlyZWRfeHAiOjE0MjEwMDB9LHsibGV2ZWwiOjE2LCJsZXZlbF94cCI6NDkwMDAwLCJyZXF1aXJlZF94cCI6MTkxMTAwMH0seyJsZXZlbCI6MTcsImxldmVsX3hwIjoxMTAwMDAsInJlcXVpcmVkX3hwIjoyMDIxMDAwfSx7ImxldmVsIjoxOCwibGV2ZWxfeHAiOjI5MDAwMCwicmVxdWlyZWRfeHAiOjIzMTEwMDB9LHsibGV2ZWwiOjE5LCJsZXZlbF94cCI6MzAwMDAwLCJyZXF1aXJlZF94cCI6MjYxMTAwMH0seyJsZXZlbCI6MjAsImxldmVsX3hwIjo2MjAwMDAsInJlcXVpcmVkX3hwIjozMjMxMDAwfSx7ImxldmVsIjoyMSwibGV2ZWxfeHAiOjEzMDAwMCwicmVxdWlyZWRfeHAiOjMzNjEwMDB9LHsibGV2ZWwiOjIyLCJsZXZlbF94cCI6MzUwMDAwLCJyZXF1aXJlZF94cCI6MzcxMTAwMH0seyJsZXZlbCI6MjMsImxldmVsX3hwIjoxMDAwMDAwLCJyZXF1aXJlZF94cCI6NDcxMTAwMH0seyJsZXZlbCI6MjQsImxldmVsX3hwIjoxNjAwMDAwLCJyZXF1aXJlZF94cCI6NjMxMTAwMH0seyJsZXZlbCI6MjUsImxldmVsX3hwIjo3MDAwMDAwLCJyZXF1aXJlZF94cCI6MTMzMTEwMDB9XX0";

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
