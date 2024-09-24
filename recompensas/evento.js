// Substitua esta string pelo seu código BASE64
const base64String = "eyJldmVudCI6eyJfaWQiOiI2NmYxODI4OWUwZGQzNTMwZGFhMmFjODgiLCJtYXhfeHAiOjEwMDgzMDAwLCJtYXhfbXVsdGlwbGllciI6MTAwMDAsIm1heF9sZXZlbCI6MjAsInByb2dyZXNzaW9uX2V2ZW50X3R5cGUiOiJkZWZhdWx0IiwiZW5kX2RhdGUiOiIyMDI0LTA5LTI2VDE0OjU5OjAwLjAwMFoiLCJsYXN0X3VwZGF0ZWQiOjE3MjcxMDM2MjU4MzksImRlc2NyaXB0aW9uIjp7ImVuIjoiQ3J5cHRvIENvbG9ycyIsImNuIjoiQ3J5cHRvIENvbG9ycyJ9LCJ0aXRsZSI6eyJlbiI6IkNyeXB0byBDb2xvcnMiLCJjbiI6IkNyeXB0byBDb2xvcnMifX0sInJld2FyZHMiOlt7ImlkIjoiNjZmMTgyOGFhMjZjMzdjMzBmN2I5OTViIiwiaXRlbV9pZCI6IjY0ZjVkNzFlOWU0ZDYyODY0MDg5MmEwOCIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjEsInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjY0ZjVkNzFlOWU0ZDYyODY0MDg5MmEwOCIsInBvd2VyIjoyNDAwLCJ3aWR0aCI6MSwibmFtZSI6eyJlbiI6IkFTSUNiaXQiLCJjbiI6IkFTSUNiaXQiLCJlcyI6IkFTSUNiaXQiLCJwdCI6IkFTSUNiaXQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJUaGlzIGlzIGEgbWluZXIuIEZvciBtaW5pbmcgY3J5cHRvLiBQcmFjdGljYWwsIHNpbXBsZSBhbmQgd2l0aCBwb3dlciBjYXBhY2l0eSBjb250cm9sbGVyIiwiY24iOiJUaGlzIGlzIGEgbWluZXIuIEZvciBtaW5pbmcgY3J5cHRvLiBQcmFjdGljYWwsIHNpbXBsZSBhbmQgd2l0aCBwb3dlciBjYXBhY2l0eSBjb250cm9sbGVyIiwiZXMiOiJUaGlzIGlzIGEgbWluZXIuIEZvciBtaW5pbmcgY3J5cHRvLiBQcmFjdGljYWwsIHNpbXBsZSBhbmQgd2l0aCBwb3dlciBjYXBhY2l0eSBjb250cm9sbGVyIiwicHQiOiJUaGlzIGlzIGEgbWluZXIuIEZvciBtaW5pbmcgY3J5cHRvLiBQcmFjdGljYWwsIHNpbXBsZSBhbmQgd2l0aCBwb3dlciBjYXBhY2l0eSBjb250cm9sbGVyIn0sImNyZWF0ZWRfYnlfdGl0bGUiOnsibGluayI6IiIsInRleHQiOiIifSwibGV2ZWwiOjAsInR5cGUiOiJiYXNpYyIsImZpbGVuYW1lIjoiYXNpY2JpdCIsImlzX2Nhbl9iZV9zb2xkX29uX21wIjpmYWxzZSwiYm9udXMiOjAsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjZmMTgyOGFhMjZjMzdjMzBmN2I5OTYxIiwiaXRlbV9pZCI6IjY0ZjVkNzFlOWU0ZDYyODY0MDg5MmEwOCIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjIsInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjY0ZjVkNzFlOWU0ZDYyODY0MDg5MmEwOCIsInBvd2VyIjoyNDAwLCJ3aWR0aCI6MSwibmFtZSI6eyJlbiI6IkFTSUNiaXQiLCJjbiI6IkFTSUNiaXQiLCJlcyI6IkFTSUNiaXQiLCJwdCI6IkFTSUNiaXQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJUaGlzIGlzIGEgbWluZXIuIEZvciBtaW5pbmcgY3J5cHRvLiBQcmFjdGljYWwsIHNpbXBsZSBhbmQgd2l0aCBwb3dlciBjYXBhY2l0eSBjb250cm9sbGVyIiwiY24iOiJUaGlzIGlzIGEgbWluZXIuIEZvciBtaW5pbmcgY3J5cHRvLiBQcmFjdGljYWwsIHNpbXBsZSBhbmQgd2l0aCBwb3dlciBjYXBhY2l0eSBjb250cm9sbGVyIiwiZXMiOiJUaGlzIGlzIGEgbWluZXIuIEZvciBtaW5pbmcgY3J5cHRvLiBQcmFjdGljYWwsIHNpbXBsZSBhbmQgd2l0aCBwb3dlciBjYXBhY2l0eSBjb250cm9sbGVyIiwicHQiOiJUaGlzIGlzIGEgbWluZXIuIEZvciBtaW5pbmcgY3J5cHRvLiBQcmFjdGljYWwsIHNpbXBsZSBhbmQgd2l0aCBwb3dlciBjYXBhY2l0eSBjb250cm9sbGVyIn0sImNyZWF0ZWRfYnlfdGl0bGUiOnsibGluayI6IiIsInRleHQiOiIifSwibGV2ZWwiOjAsInR5cGUiOiJiYXNpYyIsImZpbGVuYW1lIjoiYXNpY2JpdCIsImlzX2Nhbl9iZV9zb2xkX29uX21wIjpmYWxzZSwiYm9udXMiOjAsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjZmMTgyOGFhMjZjMzdjMzBmN2I5OTY1IiwiaXRlbV9pZCI6bnVsbCwiYW1vdW50Ijo1MDAwMDAwMCwiY3VycmVuY3kiOiJSU1QiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjMsInR5cGUiOiJtb25leSIsInRpdGxlIjp7ImVuIjoiTW9uZXkgVGl0bGUiLCJjbiI6Ik1vbmV5IFRpdGxlIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTW9uZXkgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNb25leSBSZXdhcmQgRGVzY3JpcHRpb24ifX0seyJpZCI6IjY2ZjE4MjhhYTI2YzM3YzMwZjdiOTk2OSIsIml0ZW1faWQiOiI2NGY1ZDcxZTllNGQ2Mjg2NDA4OTJhMGIiLCJhbW91bnQiOjEsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjo0LCJ0eXBlIjoibWluZXIiLCJ0aXRsZSI6eyJlbiI6Ik1pbmVyIFJld2FyZCIsImNuIjoiTWluZXIgUmV3YXJkIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24ifSwiaXRlbSI6eyJfaWQiOiI2NGY1ZDcxZTllNGQ2Mjg2NDA4OTJhMGIiLCJwb3dlciI6NjMwMCwid2lkdGgiOjEsIm5hbWUiOnsiZW4iOiJBU0lDYml0IiwiY24iOiJBU0lDYml0IiwiZXMiOiJBU0lDYml0IiwicHQiOiJBU0lDYml0In0sImRlc2NyaXB0aW9uIjp7ImVuIjoiVGhpcyBpcyBhIG1pbmVyLiBGb3IgbWluaW5nIGNyeXB0by4gUHJhY3RpY2FsLCBzaW1wbGUgYW5kIHdpdGggcG93ZXIgY2FwYWNpdHkgY29udHJvbGxlciIsImNuIjoiVGhpcyBpcyBhIG1pbmVyLiBGb3IgbWluaW5nIGNyeXB0by4gUHJhY3RpY2FsLCBzaW1wbGUgYW5kIHdpdGggcG93ZXIgY2FwYWNpdHkgY29udHJvbGxlciIsImVzIjoiVGhpcyBpcyBhIG1pbmVyLiBGb3IgbWluaW5nIGNyeXB0by4gUHJhY3RpY2FsLCBzaW1wbGUgYW5kIHdpdGggcG93ZXIgY2FwYWNpdHkgY29udHJvbGxlciIsInB0IjoiVGhpcyBpcyBhIG1pbmVyLiBGb3IgbWluaW5nIGNyeXB0by4gUHJhY3RpY2FsLCBzaW1wbGUgYW5kIHdpdGggcG93ZXIgY2FwYWNpdHkgY29udHJvbGxlciJ9LCJjcmVhdGVkX2J5X3RpdGxlIjp7ImxpbmsiOiIiLCJ0ZXh0IjoiIn0sImxldmVsIjoxLCJ0eXBlIjoibWVyZ2UiLCJmaWxlbmFtZSI6ImFzaWNiaXQiLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6ZmFsc2UsImJvbnVzIjo4LCJpc19pbl9zZXQiOmZhbHNlfX0seyJpZCI6IjY2ZjE4MjhhYTI2YzM3YzMwZjdiOTk2ZCIsIml0ZW1faWQiOiI2NGY1ZDcxZTllNGQ2Mjg2NDA4OTJhMTMiLCJhbW91bnQiOjEsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjo1LCJ0eXBlIjoibWluZXIiLCJ0aXRsZSI6eyJlbiI6Ik1pbmVyIFJld2FyZCIsImNuIjoiTWluZXIgUmV3YXJkIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24ifSwiaXRlbSI6eyJfaWQiOiI2NGY1ZDcxZTllNGQ2Mjg2NDA4OTJhMTMiLCJwb3dlciI6MTY1OTAsIndpZHRoIjoxLCJuYW1lIjp7ImVuIjoiQVNJQ2JpdCIsImNuIjoiQVNJQ2JpdCIsImVzIjoiQVNJQ2JpdCIsInB0IjoiQVNJQ2JpdCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6IlRoaXMgaXMgYSBtaW5lci4gRm9yIG1pbmluZyBjcnlwdG8uIFByYWN0aWNhbCwgc2ltcGxlIGFuZCB3aXRoIHBvd2VyIGNhcGFjaXR5IGNvbnRyb2xsZXIiLCJjbiI6IlRoaXMgaXMgYSBtaW5lci4gRm9yIG1pbmluZyBjcnlwdG8uIFByYWN0aWNhbCwgc2ltcGxlIGFuZCB3aXRoIHBvd2VyIGNhcGFjaXR5IGNvbnRyb2xsZXIiLCJlcyI6IlRoaXMgaXMgYSBtaW5lci4gRm9yIG1pbmluZyBjcnlwdG8uIFByYWN0aWNhbCwgc2ltcGxlIGFuZCB3aXRoIHBvd2VyIGNhcGFjaXR5IGNvbnRyb2xsZXIiLCJwdCI6IlRoaXMgaXMgYSBtaW5lci4gRm9yIG1pbmluZyBjcnlwdG8uIFByYWN0aWNhbCwgc2ltcGxlIGFuZCB3aXRoIHBvd2VyIGNhcGFjaXR5IGNvbnRyb2xsZXIifSwiY3JlYXRlZF9ieV90aXRsZSI6eyJsaW5rIjoiIiwidGV4dCI6IiJ9LCJsZXZlbCI6MiwidHlwZSI6Im1lcmdlIiwiZmlsZW5hbWUiOiJhc2ljYml0IiwiaXNfY2FuX2JlX3NvbGRfb25fbXAiOmZhbHNlLCJib251cyI6MjAsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjZmMTgyOGFhMjZjMzdjMzBmN2I5OTcxIiwiaXRlbV9pZCI6IjY0ZjVkNzFlOWU0ZDYyODY0MDg5MmExYiIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjYsInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjY0ZjVkNzFlOWU0ZDYyODY0MDg5MmExYiIsInBvd2VyIjo0MzU3NSwid2lkdGgiOjEsIm5hbWUiOnsiZW4iOiJBU0lDYml0IiwiY24iOiJBU0lDYml0IiwiZXMiOiJBU0lDYml0IiwicHQiOiJBU0lDYml0In0sImRlc2NyaXB0aW9uIjp7ImVuIjoiVGhpcyBpcyBhIG1pbmVyLiBGb3IgbWluaW5nIGNyeXB0by4gUHJhY3RpY2FsLCBzaW1wbGUgYW5kIHdpdGggcG93ZXIgY2FwYWNpdHkgY29udHJvbGxlciIsImNuIjoiVGhpcyBpcyBhIG1pbmVyLiBGb3IgbWluaW5nIGNyeXB0by4gUHJhY3RpY2FsLCBzaW1wbGUgYW5kIHdpdGggcG93ZXIgY2FwYWNpdHkgY29udHJvbGxlciIsImVzIjoiVGhpcyBpcyBhIG1pbmVyLiBGb3IgbWluaW5nIGNyeXB0by4gUHJhY3RpY2FsLCBzaW1wbGUgYW5kIHdpdGggcG93ZXIgY2FwYWNpdHkgY29udHJvbGxlciIsInB0IjoiVGhpcyBpcyBhIG1pbmVyLiBGb3IgbWluaW5nIGNyeXB0by4gUHJhY3RpY2FsLCBzaW1wbGUgYW5kIHdpdGggcG93ZXIgY2FwYWNpdHkgY29udHJvbGxlciJ9LCJjcmVhdGVkX2J5X3RpdGxlIjp7ImxpbmsiOiIiLCJ0ZXh0IjoiIn0sImxldmVsIjozLCJ0eXBlIjoibWVyZ2UiLCJmaWxlbmFtZSI6ImFzaWNiaXQiLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6ZmFsc2UsImJvbnVzIjo0MSwiaXNfaW5fc2V0IjpmYWxzZX19LHsiaWQiOiI2NmYxODI4YWEyNmMzN2MzMGY3Yjk5NzUiLCJpdGVtX2lkIjpudWxsLCJhbW91bnQiOjIwMDAwMDAwMCwiY3VycmVuY3kiOiJSU1QiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjcsInR5cGUiOiJtb25leSIsInRpdGxlIjp7ImVuIjoiTW9uZXkgVGl0bGUiLCJjbiI6Ik1vbmV5IFRpdGxlIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTW9uZXkgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNb25leSBSZXdhcmQgRGVzY3JpcHRpb24ifX0seyJpZCI6IjY2ZjE4MjhhYTI2YzM3YzMwZjdiOTk3OSIsIml0ZW1faWQiOiI2NTA5OTM1MjQ4ZWUyYzJhZGE5NWZjYTIiLCJhbW91bnQiOjEsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjo4LCJ0eXBlIjoibWluZXIiLCJ0aXRsZSI6eyJlbiI6Ik1pbmVyIFJld2FyZCIsImNuIjoiTWluZXIgUmV3YXJkIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24ifSwiaXRlbSI6eyJfaWQiOiI2NTA5OTM1MjQ4ZWUyYzJhZGE5NWZjYTIiLCJwb3dlciI6MTgwMDAwLCJ3aWR0aCI6MiwibmFtZSI6eyJlbiI6IlBpbmsgR2xhemVyIiwiY24iOiJQaW5rIEdsYXplciIsImVzIjoiUGluayBHbGF6ZXIiLCJwdCI6IlBpbmsgR2xhemVyIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiUmFkaWF0aW5nIHdpdGggYSBzb2Z0IHlldCBjYXB0aXZhdGluZyBodWUsIGFkZHMgYSB0b3VjaCBvZiBzb3BoaXN0aWNhdGlvbiBhbmQgYWxsdXJlIHRvIHRoZSByZWFsbSBvZiBjcnlwdG8gbWluaW5nLCBCeSBLYWl6YWtpIiwiY24iOiJSYWRpYXRpbmcgd2l0aCBhIHNvZnQgeWV0IGNhcHRpdmF0aW5nIGh1ZSwgYWRkcyBhIHRvdWNoIG9mIHNvcGhpc3RpY2F0aW9uIGFuZCBhbGx1cmUgdG8gdGhlIHJlYWxtIG9mIGNyeXB0byBtaW5pbmcsIEJ5IEthaXpha2kiLCJlcyI6IlJhZGlhdGluZyB3aXRoIGEgc29mdCB5ZXQgY2FwdGl2YXRpbmcgaHVlLCBhZGRzIGEgdG91Y2ggb2Ygc29waGlzdGljYXRpb24gYW5kIGFsbHVyZSB0byB0aGUgcmVhbG0gb2YgY3J5cHRvIG1pbmluZywgQnkgS2FpemFraSIsInB0IjoiUmFkaWF0aW5nIHdpdGggYSBzb2Z0IHlldCBjYXB0aXZhdGluZyBodWUsIGFkZHMgYSB0b3VjaCBvZiBzb3BoaXN0aWNhdGlvbiBhbmQgYWxsdXJlIHRvIHRoZSByZWFsbSBvZiBjcnlwdG8gbWluaW5nLCBCeSBLYWl6YWtpIn0sImNyZWF0ZWRfYnlfdGl0bGUiOnsibGluayI6IiIsInRleHQiOiIifSwibGV2ZWwiOjAsInR5cGUiOiJiYXNpYyIsImZpbGVuYW1lIjoicGlua19nbGF6ZXIiLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6dHJ1ZSwiYm9udXMiOjAsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjZmMTgyOGFhMjZjMzdjMzBmN2I5OTdkIiwiaXRlbV9pZCI6IjYxNTMyMTQ2ZGI1MDA4MTAyZjlmNzdlYiIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjksInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjYxNTMyMTQ2ZGI1MDA4MTAyZjlmNzdlYiIsIm5hbWUiOnsiZW4iOiJOdWNsZXVzIiwiY24iOiJOdWNsZXVzIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiSnVzdCBzZWUgaG93IGl0IGdsaW50cyBhbmQgc3BhcmtsZXMuIFRoZSBwdXJlIGJlYXV0eSEiLCJjbiI6Ikp1c3Qgc2VlIGhvdyBpdCBnbGludHMgYW5kIHNwYXJrbGVzLiBUaGUgcHVyZSBiZWF1dHkhIn0sInBvd2VyIjoxMDAwMDAsIndpZHRoIjoyLCJsZXZlbCI6MCwidHlwZSI6ImJhc2ljIiwiZmlsZW5hbWUiOiJudWNsZXVzIiwiaXNfY2FuX2JlX3NvbGRfb25fbXAiOnRydWUsImJvbnVzIjoxNTAsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjZmMTgyOGFhMjZjMzdjMzBmN2I5OTgyIiwiaXRlbV9pZCI6IjYxNTMyMTQ2ZGI1MDA4MTAyZjlmNzdlMyIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjEwLCJ0eXBlIjoibWluZXIiLCJ0aXRsZSI6eyJlbiI6Ik1pbmVyIFJld2FyZCIsImNuIjoiTWluZXIgUmV3YXJkIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24ifSwiaXRlbSI6eyJfaWQiOiI2MTUzMjE0NmRiNTAwODEwMmY5Zjc3ZTMiLCJuYW1lIjp7ImVuIjoiQW50aeKAk1BoYXplIiwiY24iOiJBbnRp4oCTUGhhemUiLCJlcyI6IkFudGnigJNQaGF6ZSIsInB0IjoiQW50aeKAk1BoYXplIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiSGFybW9uaWNhbGx5IGJhbGFuY2VkIG1pbmVyLiBJbi1idWlsdCBzcGVha2VyIGlzIHNldCB0byBhIHBsZWFzYW50IGZyZXF1ZW5jeSB0byBtYWtlIHlvdSBzd2luZyB3aGlsZSB5b3UgbWluZS4gRGFyayBTdGFyIFNlcmllcyBNaW5lci4iLCJjbiI6Ikhhcm1vbmljYWxseSBiYWxhbmNlZCBtaW5lci4gSW4tYnVpbHQgc3BlYWtlciBpcyBzZXQgdG8gYSBwbGVhc2FudCBmcmVxdWVuY3kgdG8gbWFrZSB5b3Ugc3dpbmcgd2hpbGUgeW91IG1pbmUuIERhcmsgU3RhciBTZXJpZXMgTWluZXIuIiwiZXMiOiJIYXJtb25pY2FsbHkgYmFsYW5jZWQgbWluZXIuIEluLWJ1aWx0IHNwZWFrZXIgaXMgc2V0IHRvIGEgcGxlYXNhbnQgZnJlcXVlbmN5IHRvIG1ha2UgeW91IHN3aW5nIHdoaWxlIHlvdSBtaW5lLiBEYXJrIFN0YXIgU2VyaWVzIE1pbmVyLiIsInB0IjoiSGFybW9uaWNhbGx5IGJhbGFuY2VkIG1pbmVyLiBJbi1idWlsdCBzcGVha2VyIGlzIHNldCB0byBhIHBsZWFzYW50IGZyZXF1ZW5jeSB0byBtYWtlIHlvdSBzd2luZyB3aGlsZSB5b3UgbWluZS4gRGFyayBTdGFyIFNlcmllcyBNaW5lci4ifSwicG93ZXIiOjEyNTAwMCwid2lkdGgiOjEsImxldmVsIjowLCJ0eXBlIjoiYmFzaWMiLCJmaWxlbmFtZSI6ImFudGnigJNwaGF6ZSIsImlzX2Nhbl9iZV9zb2xkX29uX21wIjpmYWxzZSwiY3JlYXRlZF9ieV90aXRsZSI6eyJsaW5rIjoiIiwidGV4dCI6IiJ9LCJib251cyI6MTUwLCJpc19pbl9zZXQiOmZhbHNlfX0seyJpZCI6IjY2ZjE4MjhhYTI2YzM3YzMwZjdiOTk4NiIsIml0ZW1faWQiOm51bGwsImFtb3VudCI6NTAwMDAwMDAwLCJjdXJyZW5jeSI6IlJTVCIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MTEsInR5cGUiOiJtb25leSIsInRpdGxlIjp7ImVuIjoiTW9uZXkgVGl0bGUiLCJjbiI6Ik1vbmV5IFRpdGxlIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTW9uZXkgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNb25leSBSZXdhcmQgRGVzY3JpcHRpb24ifX0seyJpZCI6IjY2ZjE4MjhhYTI2YzM3YzMwZjdiOTk4YSIsIml0ZW1faWQiOm51bGwsImFtb3VudCI6MTAwMDAwMDAsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjYwNDgwMDAwMCwicmVxdWlyZWRfbGV2ZWwiOjEyLCJ0eXBlIjoicG93ZXIiLCJ0aXRsZSI6eyJlbiI6IlBvd2VyIiwiY24iOiJQb3dlciJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6IlBvd2VyIFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiUG93ZXIgUmV3YXJkIERlc2NyaXB0aW9uIn19LHsiaWQiOiI2NmYxODI4YWEyNmMzN2MzMGY3Yjk5OGUiLCJpdGVtX2lkIjoiNjFmOTM1NmE4YjQ2Y2U2ODg5MzkwMjRlIiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MTMsInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjYxZjkzNTZhOGI0NmNlNjg4OTM5MDI0ZSIsIm5hbWUiOnsiZW4iOiLpnZLngavpvpkgKEF6dXJlIERyYWdvbikiLCJjbiI6IumdkueBq+m+mSAoQXp1cmUgRHJhZ29uKSJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6IkZyb20gdGhlIGRlZXAgd2F0ZXJzIGl0IHJhaXNlZCB0byB1c2hlciB0aGUgYXBwcm9hY2hpbmcgb2YgYSBuZXcgc3ByaW5nIGluIG91ciBtaW5pbmcgcm9vbS4iLCJjbiI6IkZyb20gdGhlIGRlZXAgd2F0ZXJzIGl0IHJhaXNlZCB0byB1c2hlciB0aGUgYXBwcm9hY2hpbmcgb2YgYSBuZXcgc3ByaW5nIGluIG91ciBtaW5pbmcgcm9vbS4ifSwibGV2ZWwiOjAsInR5cGUiOiJiYXNpYyIsInBvd2VyIjoyMDAwMDAsIndpZHRoIjoyLCJmaWxlbmFtZSI6ImF6dXJlX2RyYWdvbiIsImlzX2Nhbl9iZV9zb2xkX29uX21wIjp0cnVlLCJib251cyI6MzAwLCJpc19pbl9zZXQiOmZhbHNlfX0seyJpZCI6IjY2ZjE4MjhhYTI2YzM3YzMwZjdiOTk5NCIsIml0ZW1faWQiOiI2NDkyZTgwZDdmMjhkMTM5NWQ5NThjZDMiLCJhbW91bnQiOjEsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjoxNCwidHlwZSI6Im1pbmVyIiwidGl0bGUiOnsiZW4iOiJNaW5lciBSZXdhcmQiLCJjbiI6Ik1pbmVyIFJld2FyZCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIn0sIml0ZW0iOnsiX2lkIjoiNjQ5MmU4MGQ3ZjI4ZDEzOTVkOTU4Y2QzIiwicG93ZXIiOjU2MDAwMCwid2lkdGgiOjIsIm5hbWUiOnsiZW4iOiJNb3JuaW5nIFBhcmFkaXNlIiwiY24iOiJNb3JuaW5nIFBhcmFkaXNlIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiVGhvc2UgZmVlbGluZywgd2hlbiB5b3Ugc3RhcnRpbmcgYSBuZXcgZGF5IGJ5IHdha2luZyB1cCBhbmQgY2hlY2tpbmcgeW91ciBhY2NvdW50IHdpdGggZnJlc2hseSBtaW5lZCBjcnlwdG/igKYgQ3JlYXRlZCBieUFzbWl0YSIsImNuIjoiVGhvc2UgZmVlbGluZywgd2hlbiB5b3Ugc3RhcnRpbmcgYSBuZXcgZGF5IGJ5IHdha2luZyB1cCBhbmQgY2hlY2tpbmcgeW91ciBhY2NvdW50IHdpdGggZnJlc2hseSBtaW5lZCBjcnlwdG/igKYgQ3JlYXRlZCBieUFzbWl0YSJ9LCJjcmVhdGVkX2J5X3RpdGxlIjp7InRleHQiOiJBc21pdGEiLCJsaW5rIjoiIn0sImxldmVsIjowLCJ0eXBlIjoiYmFzaWMiLCJmaWxlbmFtZSI6Im1vcm5pbmdfcGFyYWRpc2UiLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6dHJ1ZSwiYm9udXMiOjE1MCwiaXNfaW5fc2V0IjpmYWxzZX19LHsiaWQiOiI2NmYxODI4YWEyNmMzN2MzMGY3Yjk5OTgiLCJpdGVtX2lkIjoiNjIzMjQ0MTlhMjU4ZDU4MTYwNzRhZWIxIiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MTUsInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjYyMzI0NDE5YTI1OGQ1ODE2MDc0YWViMSIsIm5hbWUiOnsiZW4iOiJDbG92ZXItbuKAmS1PdmVyIiwiY24iOiJDbG92ZXItbuKAmS1PdmVyIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiIiwiY24iOiIifSwicG93ZXIiOjUzMDAwMCwid2lkdGgiOjIsImxldmVsIjowLCJ0eXBlIjoiYmFzaWMiLCJmaWxlbmFtZSI6ImNsb3Zlcl9uX292ZXIiLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6dHJ1ZSwiYm9udXMiOjI1MCwiaXNfaW5fc2V0IjpmYWxzZX19LHsiaWQiOiI2NmYxODI4YWEyNmMzN2MzMGY3Yjk5OWMiLCJpdGVtX2lkIjoiNjViYmExOTJhMTljMzk0YWEzMDk2MjQxIiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MTYsInR5cGUiOiJyYWNrIiwidGl0bGUiOnsiZW4iOiJSYWNrIFRpdGxlIiwiY24iOiJSYWNrIFRpdGxlIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiUmFjayBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6IlJhY2sgUmV3YXJkIERlc2NyaXB0aW9uIn0sIml0ZW0iOnsibmFtZSI6eyJlbiI6IkdyZWVuIFNpbGsgNiIsImNuIjoiR3JlZW4gU2lsayA2In0sImRlc2NyaXB0aW9uIjp7ImVuIjoiQSBtb2RpZmllZCB2ZXJzaW9uIG9mIEdyZWVuIFNpbGsgOCAtIHRoaXMgdGltZSB3ZSBzcXVlZXplZCB0aGUgcmFjayBzbyB0aWdodCwgdGhhdCBleHRyYSBib251cyBwb3dlciBoYXMgYmVlbiBjcmVhdGVkISBBbG1vc3QgbGlrZSBkaWFtb25kcy4iLCJjbiI6IkEgbW9kaWZpZWQgdmVyc2lvbiBvZiBHcmVlbiBTaWxrIDggLSB0aGlzIHRpbWUgd2Ugc3F1ZWV6ZWQgdGhlIHJhY2sgc28gdGlnaHQsIHRoYXQgZXh0cmEgYm9udXMgcG93ZXIgaGFzIGJlZW4gY3JlYXRlZCEgQWxtb3N0IGxpa2UgZGlhbW9uZHMuIn0sIl9pZCI6IjY1YmJhMTkyYTE5YzM5NGFhMzA5NjI0MSIsImNhcGFjaXR5Ijo2LCJpc19pbl9zZXQiOmZhbHNlfX0seyJpZCI6IjY2ZjE4MjhhYTI2YzM3YzMwZjdiOTlhMCIsIml0ZW1faWQiOiI2MjMxYzNjZGEyNThkNTgxNjBkNTM2MDciLCJhbW91bnQiOjEsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjoxNywidHlwZSI6Im1pbmVyIiwidGl0bGUiOnsiZW4iOiJNaW5lciBSZXdhcmQiLCJjbiI6Ik1pbmVyIFJld2FyZCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIn0sIml0ZW0iOnsiX2lkIjoiNjIzMWMzY2RhMjU4ZDU4MTYwZDUzNjA3IiwibmFtZSI6eyJlbiI6IkpQRUcgQ29sbGVjdG9vb3IiLCJjbiI6IkpQRUcgQ29sbGVjdG9vb3IifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJFdmVyeWJvZHkgZ2FuZ3N0YSB1bnRpbCDigJxTYXZlIGltYWdlIGFz4oCm4oCdIiwiY24iOiJFdmVyeWJvZHkgZ2FuZ3N0YSB1bnRpbCDigJxTYXZlIGltYWdlIGFz4oCm4oCdIn0sInBvd2VyIjoxMDAwMDAsIndpZHRoIjoyLCJsZXZlbCI6MCwidHlwZSI6ImJhc2ljIiwiZmlsZW5hbWUiOiJqcGVnX2NvbGxlY3Rvb29yIiwiaXNfY2FuX2JlX3NvbGRfb25fbXAiOnRydWUsImJvbnVzIjoxMDAsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjZmMTgyOGFhMjZjMzdjMzBmN2I5OWE1IiwiaXRlbV9pZCI6IjY1MTJhNmQ5ZGIyYmI5MGY2YTUyNGE3YiIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjE4LCJ0eXBlIjoibWluZXIiLCJ0aXRsZSI6eyJlbiI6Ik1pbmVyIFJld2FyZCIsImNuIjoiTWluZXIgUmV3YXJkIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24ifSwiaXRlbSI6eyJfaWQiOiI2NTEyYTZkOWRiMmJiOTBmNmE1MjRhN2IiLCJwb3dlciI6NzAwMDAwLCJ3aWR0aCI6MiwibmFtZSI6eyJlbiI6IkJydXNoJ24nUGFsZXR0ZSIsImNuIjoiQnJ1c2gnbidQYWxldHRlIiwiZXMiOiJCcnVzaCduJ1BhbGV0dGUiLCJwdCI6IkJydXNoJ24nUGFsZXR0ZSJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6IkVtYm9keWluZyB0aGUgYXJ0aXN0cnkgb2YgbWluaW5nIGNyeXB0bywgdGhlIEJydXNoJ24nUGFsZXR0ZSBtaW5lciBncmFjZWZ1bGx5IHdpZWxkcyBpdHMgdmlydHVhbCB0b29scyB0byBjcmFmdCBhIG1hc3RlcnBpZWNlIG9mIGVhcm5pbmdzLiBCeSBLYWl6YWtpIiwiY24iOiJFbWJvZHlpbmcgdGhlIGFydGlzdHJ5IG9mIG1pbmluZyBjcnlwdG8sIHRoZSBCcnVzaCduJ1BhbGV0dGUgbWluZXIgZ3JhY2VmdWxseSB3aWVsZHMgaXRzIHZpcnR1YWwgdG9vbHMgdG8gY3JhZnQgYSBtYXN0ZXJwaWVjZSBvZiBlYXJuaW5ncy4gQnkgS2FpemFraSIsImVzIjoiRW1ib2R5aW5nIHRoZSBhcnRpc3RyeSBvZiBtaW5pbmcgY3J5cHRvLCB0aGUgQnJ1c2gnbidQYWxldHRlIG1pbmVyIGdyYWNlZnVsbHkgd2llbGRzIGl0cyB2aXJ0dWFsIHRvb2xzIHRvIGNyYWZ0IGEgbWFzdGVycGllY2Ugb2YgZWFybmluZ3MuIEJ5IEthaXpha2kiLCJwdCI6IkVtYm9keWluZyB0aGUgYXJ0aXN0cnkgb2YgbWluaW5nIGNyeXB0bywgdGhlIEJydXNoJ24nUGFsZXR0ZSBtaW5lciBncmFjZWZ1bGx5IHdpZWxkcyBpdHMgdmlydHVhbCB0b29scyB0byBjcmFmdCBhIG1hc3RlcnBpZWNlIG9mIGVhcm5pbmdzLiBCeSBLYWl6YWtpIn0sImNyZWF0ZWRfYnlfdGl0bGUiOnsibGluayI6IiIsInRleHQiOiIifSwibGV2ZWwiOjAsInR5cGUiOiJiYXNpYyIsImZpbGVuYW1lIjoiYnJ1c2hucGFsZXR0ZSIsImlzX2Nhbl9iZV9zb2xkX29uX21wIjp0cnVlLCJib251cyI6NzUsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjZmMTgyOGFhMjZjMzdjMzBmN2I5OWE5IiwiaXRlbV9pZCI6IjY1MTJhNmQ5ZGIyYmI5MGY2YTUyNGE3ZSIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjE5LCJ0eXBlIjoibWluZXIiLCJ0aXRsZSI6eyJlbiI6Ik1pbmVyIFJld2FyZCIsImNuIjoiTWluZXIgUmV3YXJkIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24ifSwiaXRlbSI6eyJfaWQiOiI2NTEyYTZkOWRiMmJiOTBmNmE1MjRhN2UiLCJwb3dlciI6MTgzNzUwMCwid2lkdGgiOjIsIm5hbWUiOnsiZW4iOiJCcnVzaCduJ1BhbGV0dGUiLCJjbiI6IkJydXNoJ24nUGFsZXR0ZSIsImVzIjoiQnJ1c2gnbidQYWxldHRlIiwicHQiOiJCcnVzaCduJ1BhbGV0dGUifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJFbWJvZHlpbmcgdGhlIGFydGlzdHJ5IG9mIG1pbmluZyBjcnlwdG8sIHRoZSBCcnVzaCduJ1BhbGV0dGUgbWluZXIgZ3JhY2VmdWxseSB3aWVsZHMgaXRzIHZpcnR1YWwgdG9vbHMgdG8gY3JhZnQgYSBtYXN0ZXJwaWVjZSBvZiBlYXJuaW5ncy4gQnkgS2FpemFraSIsImNuIjoiRW1ib2R5aW5nIHRoZSBhcnRpc3RyeSBvZiBtaW5pbmcgY3J5cHRvLCB0aGUgQnJ1c2gnbidQYWxldHRlIG1pbmVyIGdyYWNlZnVsbHkgd2llbGRzIGl0cyB2aXJ0dWFsIHRvb2xzIHRvIGNyYWZ0IGEgbWFzdGVycGllY2Ugb2YgZWFybmluZ3MuIEJ5IEthaXpha2kiLCJlcyI6IkVtYm9keWluZyB0aGUgYXJ0aXN0cnkgb2YgbWluaW5nIGNyeXB0bywgdGhlIEJydXNoJ24nUGFsZXR0ZSBtaW5lciBncmFjZWZ1bGx5IHdpZWxkcyBpdHMgdmlydHVhbCB0b29scyB0byBjcmFmdCBhIG1hc3RlcnBpZWNlIG9mIGVhcm5pbmdzLiBCeSBLYWl6YWtpIiwicHQiOiJFbWJvZHlpbmcgdGhlIGFydGlzdHJ5IG9mIG1pbmluZyBjcnlwdG8sIHRoZSBCcnVzaCduJ1BhbGV0dGUgbWluZXIgZ3JhY2VmdWxseSB3aWVsZHMgaXRzIHZpcnR1YWwgdG9vbHMgdG8gY3JhZnQgYSBtYXN0ZXJwaWVjZSBvZiBlYXJuaW5ncy4gQnkgS2FpemFraSJ9LCJjcmVhdGVkX2J5X3RpdGxlIjp7ImxpbmsiOiIiLCJ0ZXh0IjoiIn0sImxldmVsIjoxLCJ0eXBlIjoibWVyZ2UiLCJmaWxlbmFtZSI6ImJydXNobnBhbGV0dGUiLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6dHJ1ZSwiYm9udXMiOjE4MCwiaXNfaW5fc2V0IjpmYWxzZX19LHsiaWQiOiI2NmYxODI4YWEyNmMzN2MzMGY3Yjk5YWQiLCJpdGVtX2lkIjoiNjZmMTdlZWJlMGRkMzUzMGRhYTI5N2YzIiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MjAsInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjY2ZjE3ZWViZTBkZDM1MzBkYWEyOTdmMyIsInBvd2VyIjo0MzUwMDAwLCJ3aWR0aCI6MiwibmFtZSI6eyJlbiI6IkdyZWVuIFNwYWNlIiwiY24iOiJHcmVlbiBTcGFjZSIsImVzIjoiR3JlZW4gU3BhY2UiLCJwdCI6IkdyZWVuIFNwYWNlIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiRGl2ZSBpbnRvIHRoZSB2YXN0IGRpZ2l0YWwgZnJvbnRpZXIgd2l0aCBHcmVlblNwYWNlLCB3aGVyZSBjcnlwdG8gbWluaW5nIGlzIGFzIGxpbWl0bGVzcyBhcyB0aGUgdW5pdmVyc2UgaXRzZWxmLiBIYXJuZXNzaW5nIHRoZSBwb3dlciBvZiB2aWJyYW50LCBuZW9uIGdyZWVuLCBpdCB0cmFuc2Zvcm1zIGV2ZXJ5IGFsZ29yaXRobSBpbnRvIGEgbHVzaCBsYW5kc2NhcGUgb2YgY3J5cHRvIHJpY2hlcywgcmVhZHkgdG8gYmUgZXhwbG9yZWQuIiwiY24iOiJEaXZlIGludG8gdGhlIHZhc3QgZGlnaXRhbCBmcm9udGllciB3aXRoIEdyZWVuU3BhY2UsIHdoZXJlIGNyeXB0byBtaW5pbmcgaXMgYXMgbGltaXRsZXNzIGFzIHRoZSB1bml2ZXJzZSBpdHNlbGYuIEhhcm5lc3NpbmcgdGhlIHBvd2VyIG9mIHZpYnJhbnQsIG5lb24gZ3JlZW4sIGl0IHRyYW5zZm9ybXMgZXZlcnkgYWxnb3JpdGhtIGludG8gYSBsdXNoIGxhbmRzY2FwZSBvZiBjcnlwdG8gcmljaGVzLCByZWFkeSB0byBiZSBleHBsb3JlZC4iLCJlcyI6IkRpdmUgaW50byB0aGUgdmFzdCBkaWdpdGFsIGZyb250aWVyIHdpdGggR3JlZW5TcGFjZSwgd2hlcmUgY3J5cHRvIG1pbmluZyBpcyBhcyBsaW1pdGxlc3MgYXMgdGhlIHVuaXZlcnNlIGl0c2VsZi4gSGFybmVzc2luZyB0aGUgcG93ZXIgb2YgdmlicmFudCwgbmVvbiBncmVlbiwgaXQgdHJhbnNmb3JtcyBldmVyeSBhbGdvcml0aG0gaW50byBhIGx1c2ggbGFuZHNjYXBlIG9mIGNyeXB0byByaWNoZXMsIHJlYWR5IHRvIGJlIGV4cGxvcmVkLiIsInB0IjoiRGl2ZSBpbnRvIHRoZSB2YXN0IGRpZ2l0YWwgZnJvbnRpZXIgd2l0aCBHcmVlblNwYWNlLCB3aGVyZSBjcnlwdG8gbWluaW5nIGlzIGFzIGxpbWl0bGVzcyBhcyB0aGUgdW5pdmVyc2UgaXRzZWxmLiBIYXJuZXNzaW5nIHRoZSBwb3dlciBvZiB2aWJyYW50LCBuZW9uIGdyZWVuLCBpdCB0cmFuc2Zvcm1zIGV2ZXJ5IGFsZ29yaXRobSBpbnRvIGEgbHVzaCBsYW5kc2NhcGUgb2YgY3J5cHRvIHJpY2hlcywgcmVhZHkgdG8gYmUgZXhwbG9yZWQuIn0sImNyZWF0ZWRfYnlfdGl0bGUiOnsibGluayI6IiIsInRleHQiOiIifSwibGV2ZWwiOjAsInR5cGUiOiJiYXNpYyIsImZpbGVuYW1lIjoiZ3JlZW5fc3BhY2UiLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6dHJ1ZSwiYm9udXMiOjE3NSwiaXNfaW5fc2V0IjpmYWxzZX19XSwibGV2ZWxzX2NvbmZpZyI6W3sibGV2ZWwiOjEsImxldmVsX3hwIjoxMDAwLCJyZXF1aXJlZF94cCI6MTAwMH0seyJsZXZlbCI6MiwibGV2ZWxfeHAiOjIwMDAsInJlcXVpcmVkX3hwIjozMDAwfSx7ImxldmVsIjozLCJsZXZlbF94cCI6NDAwMCwicmVxdWlyZWRfeHAiOjcwMDB9LHsibGV2ZWwiOjQsImxldmVsX3hwIjo4MDAwLCJyZXF1aXJlZF94cCI6MTUwMDB9LHsibGV2ZWwiOjUsImxldmVsX3hwIjoxMjAwMCwicmVxdWlyZWRfeHAiOjI3MDAwfSx7ImxldmVsIjo2LCJsZXZlbF94cCI6MTYwMDAsInJlcXVpcmVkX3hwIjo0MzAwMH0seyJsZXZlbCI6NywibGV2ZWxfeHAiOjEyMDAwMCwicmVxdWlyZWRfeHAiOjE2MzAwMH0seyJsZXZlbCI6OCwibGV2ZWxfeHAiOjIxMDAwMCwicmVxdWlyZWRfeHAiOjM3MzAwMH0seyJsZXZlbCI6OSwibGV2ZWxfeHAiOjEyMDAwMCwicmVxdWlyZWRfeHAiOjQ5MzAwMH0seyJsZXZlbCI6MTAsImxldmVsX3hwIjoxNTAwMDAsInJlcXVpcmVkX3hwIjo2NDMwMDB9LHsibGV2ZWwiOjExLCJsZXZlbF94cCI6NDIwMDAwLCJyZXF1aXJlZF94cCI6MTA2MzAwMH0seyJsZXZlbCI6MTIsImxldmVsX3hwIjo0NzAwMDAsInJlcXVpcmVkX3hwIjoxNTMzMDAwfSx7ImxldmVsIjoxMywibGV2ZWxfeHAiOjUzMDAwMCwicmVxdWlyZWRfeHAiOjIwNjMwMDB9LHsibGV2ZWwiOjE0LCJsZXZlbF94cCI6NTgwMDAwLCJyZXF1aXJlZF94cCI6MjY0MzAwMH0seyJsZXZlbCI6MTUsImxldmVsX3hwIjo2MzAwMDAsInJlcXVpcmVkX3hwIjozMjczMDAwfSx7ImxldmVsIjoxNiwibGV2ZWxfeHAiOjY4MDAwMCwicmVxdWlyZWRfeHAiOjM5NTMwMDB9LHsibGV2ZWwiOjE3LCJsZXZlbF94cCI6NzMwMDAwLCJyZXF1aXJlZF94cCI6NDY4MzAwMH0seyJsZXZlbCI6MTgsImxldmVsX3hwIjoxMDAwMDAwLCJyZXF1aXJlZF94cCI6NTY4MzAwMH0seyJsZXZlbCI6MTksImxldmVsX3hwIjoxNDAwMDAwLCJyZXF1aXJlZF94cCI6NzA4MzAwMH0seyJsZXZlbCI6MjAsImxldmVsX3hwIjozMDAwMDAwLCJyZXF1aXJlZF94cCI6MTAwODMwMDB9XX0=";

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
