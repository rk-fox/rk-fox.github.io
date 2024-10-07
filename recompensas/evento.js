// Substitua esta string pelo seu código BASE64
const base64String = "eyJldmVudCI6eyJfaWQiOiI2NzAzZjgzMTcyY2Y3M2IxZDVkMDdlMDkiLCJtYXhfeHAiOjQ2MTYwMDAsIm1heF9tdWx0aXBsaWVyIjoxMDAwMCwibWF4X2xldmVsIjoxNSwicHJvZ3Jlc3Npb25fZXZlbnRfdHlwZSI6ImRlZmF1bHQiLCJlbmRfZGF0ZSI6IjIwMjQtMTAtMDlUMTU6MDA6MDAuMDAwWiIsImxhc3RfdXBkYXRlZCI6MTcyODMxMzM5MzUxNiwiZGVzY3JpcHRpb24iOnsiZW4iOiJbMDfigJMwOSBPY3RdIEZvb2QgRmVzdGl2YWwiLCJjbiI6IlswN+KAkzA5IE9jdF0gRm9vZCBGZXN0aXZhbCJ9LCJ0aXRsZSI6eyJlbiI6IkZvb2QgRmVzdGl2YWwiLCJjbiI6IkZvb2QgRmVzdGl2YWwifX0sInJld2FyZHMiOlt7ImlkIjoiNjcwM2Y4MzFhMjZjMzdjMzBmMjllYmNlIiwiaXRlbV9pZCI6bnVsbCwiYW1vdW50IjoxMCwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjEsInR5cGUiOiJzZWFzb25fcGFzc194cCIsInRpdGxlIjp7ImVuIjoiU2Vhc29uIFBhc3MgWFAiLCJjbiI6IlNlYXNvbiBQYXNzIFhQIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiU2Vhc29uIFBhc3MgWFAgRGVzY3JpcHRpb24iLCJjbiI6IlNlYXNvbiBQYXNzIFhQIERlc2NyaXB0aW9uIn19LHsiaWQiOiI2NzAzZjgzMWEyNmMzN2MzMGYyOWViZDUiLCJpdGVtX2lkIjpudWxsLCJhbW91bnQiOjI1MDAwMCwiY3VycmVuY3kiOiJSTFQiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjIsInR5cGUiOiJtb25leSIsInRpdGxlIjp7ImVuIjoiTW9uZXkgVGl0bGUiLCJjbiI6Ik1vbmV5IFRpdGxlIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTW9uZXkgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNb25leSBSZXdhcmQgRGVzY3JpcHRpb24ifX0seyJpZCI6IjY3MDNmODMxYTI2YzM3YzMwZjI5ZWJkOSIsIml0ZW1faWQiOm51bGwsImFtb3VudCI6NTAwMDAwMDAsImN1cnJlbmN5IjoiUlNUIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjozLCJ0eXBlIjoibW9uZXkiLCJ0aXRsZSI6eyJlbiI6Ik1vbmV5IFRpdGxlIiwiY24iOiJNb25leSBUaXRsZSJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6Ik1vbmV5IFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiTW9uZXkgUmV3YXJkIERlc2NyaXB0aW9uIn19LHsiaWQiOiI2NzAzZjgzMWEyNmMzN2MzMGYyOWViZGQiLCJpdGVtX2lkIjoiNjUwMDQzODYyMjE2ZTE4NDFlYmE4NTMyIiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6NCwidHlwZSI6Im1pbmVyIiwidGl0bGUiOnsiZW4iOiJNaW5lciBSZXdhcmQiLCJjbiI6Ik1pbmVyIFJld2FyZCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIn0sIml0ZW0iOnsiX2lkIjoiNjUwMDQzODYyMjE2ZTE4NDFlYmE4NTMyIiwicG93ZXIiOjE1NzUwLCJ3aWR0aCI6MSwibmFtZSI6eyJlbiI6IkJpdEFjZSIsImNuIjoiQml0QWNlIiwiZXMiOiJCaXRBY2UiLCJwdCI6IkJpdEFjZSJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6IllvdXIgY3J5cHRvIG1pbmluZyBhY2UiLCJjbiI6IllvdXIgY3J5cHRvIG1pbmluZyBhY2UiLCJlcyI6IllvdXIgY3J5cHRvIG1pbmluZyBhY2UiLCJwdCI6IllvdXIgY3J5cHRvIG1pbmluZyBhY2UifSwiY3JlYXRlZF9ieV90aXRsZSI6eyJsaW5rIjoiIiwidGV4dCI6IiJ9LCJsZXZlbCI6MSwidHlwZSI6Im1lcmdlIiwiZmlsZW5hbWUiOiJiaXRhY2UiLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6ZmFsc2UsImJvbnVzIjo4LCJpc19pbl9zZXQiOmZhbHNlfX0seyJpZCI6IjY3MDNmODMxYTI2YzM3YzMwZjI5ZWJlMSIsIml0ZW1faWQiOiI2NTAwNDM4NjIyMTZlMTg0MWViYTg1MmYiLCJhbW91bnQiOjEsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjo1LCJ0eXBlIjoibWluZXIiLCJ0aXRsZSI6eyJlbiI6Ik1pbmVyIFJld2FyZCIsImNuIjoiTWluZXIgUmV3YXJkIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24ifSwiaXRlbSI6eyJfaWQiOiI2NTAwNDM4NjIyMTZlMTg0MWViYTg1MmYiLCJwb3dlciI6NjAwMCwid2lkdGgiOjEsIm5hbWUiOnsiZW4iOiJCaXRBY2UiLCJjbiI6IkJpdEFjZSIsImVzIjoiQml0QWNlIiwicHQiOiJCaXRBY2UifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJZb3VyIGNyeXB0byBtaW5pbmcgYWNlIiwiY24iOiJZb3VyIGNyeXB0byBtaW5pbmcgYWNlIiwiZXMiOiJZb3VyIGNyeXB0byBtaW5pbmcgYWNlIiwicHQiOiJZb3VyIGNyeXB0byBtaW5pbmcgYWNlIn0sImNyZWF0ZWRfYnlfdGl0bGUiOnsibGluayI6IiIsInRleHQiOiIifSwibGV2ZWwiOjAsInR5cGUiOiJiYXNpYyIsImZpbGVuYW1lIjoiYml0YWNlIiwiaXNfY2FuX2JlX3NvbGRfb25fbXAiOmZhbHNlLCJib251cyI6MCwiaXNfaW5fc2V0IjpmYWxzZX19LHsiaWQiOiI2NzAzZjgzMWEyNmMzN2MzMGYyOWViZTUiLCJpdGVtX2lkIjpudWxsLCJhbW91bnQiOjE1LCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6NiwidHlwZSI6InNlYXNvbl9wYXNzX3hwIiwidGl0bGUiOnsiZW4iOiJTZWFzb24gUGFzcyBYUCIsImNuIjoiU2Vhc29uIFBhc3MgWFAifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJTZWFzb24gUGFzcyBYUCBEZXNjcmlwdGlvbiIsImNuIjoiU2Vhc29uIFBhc3MgWFAgRGVzY3JpcHRpb24ifX0seyJpZCI6IjY3MDNmODMxYTI2YzM3YzMwZjI5ZWJlOSIsIml0ZW1faWQiOm51bGwsImFtb3VudCI6MTAwMDAwMDAwLCJjdXJyZW5jeSI6IlJTVCIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6NywidHlwZSI6Im1vbmV5IiwidGl0bGUiOnsiZW4iOiJNb25leSBUaXRsZSIsImNuIjoiTW9uZXkgVGl0bGUifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNb25leSBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1vbmV5IFJld2FyZCBEZXNjcmlwdGlvbiJ9fSx7ImlkIjoiNjcwM2Y4MzFhMjZjMzdjMzBmMjllYmVkIiwiaXRlbV9pZCI6IjY1MDA0Mzg2MjIxNmUxODQxZWJhODU0YSIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjgsInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjY1MDA0Mzg2MjIxNmUxODQxZWJhODU0YSIsInBvd2VyIjoyODUyODUsIndpZHRoIjoxLCJuYW1lIjp7ImVuIjoiQml0QWNlIiwiY24iOiJCaXRBY2UiLCJlcyI6IkJpdEFjZSIsInB0IjoiQml0QWNlIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiWW91ciBjcnlwdG8gbWluaW5nIGFjZSIsImNuIjoiWW91ciBjcnlwdG8gbWluaW5nIGFjZSIsImVzIjoiWW91ciBjcnlwdG8gbWluaW5nIGFjZSIsInB0IjoiWW91ciBjcnlwdG8gbWluaW5nIGFjZSJ9LCJjcmVhdGVkX2J5X3RpdGxlIjp7ImxpbmsiOiIiLCJ0ZXh0IjoiIn0sImxldmVsIjo0LCJ0eXBlIjoibWVyZ2UiLCJmaWxlbmFtZSI6ImJpdGFjZSIsImlzX2Nhbl9iZV9zb2xkX29uX21wIjpmYWxzZSwiYm9udXMiOjY1LCJpc19pbl9zZXQiOmZhbHNlfX0seyJpZCI6IjY3MDNmODMxYTI2YzM3YzMwZjI5ZWJmMSIsIml0ZW1faWQiOm51bGwsImFtb3VudCI6NTAwMDAwMCwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6NjA0ODAwMDAwLCJyZXF1aXJlZF9sZXZlbCI6OSwidHlwZSI6InBvd2VyIiwidGl0bGUiOnsiZW4iOiJQb3dlciIsImNuIjoiUG93ZXIifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJQb3dlciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6IlBvd2VyIFJld2FyZCBEZXNjcmlwdGlvbiJ9fSx7ImlkIjoiNjcwM2Y4MzFhMjZjMzdjMzBmMjllYmY1IiwiaXRlbV9pZCI6IjYyOTYyM2M1NTMwZjQ4YThlN2E5MDg5NiIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjEwLCJ0eXBlIjoibWluZXIiLCJ0aXRsZSI6eyJlbiI6Ik1pbmVyIFJld2FyZCIsImNuIjoiTWluZXIgUmV3YXJkIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24ifSwiaXRlbSI6eyJfaWQiOiI2Mjk2MjNjNTUzMGY0OGE4ZTdhOTA4OTYiLCJuYW1lIjp7ImVuIjoiSWNlZC1vdXQnLUNyZWFtIiwiY24iOiJJY2VkLW91dCctQ3JlYW0ifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJXaGF0J3MgYmV0dGVyIHRoYW4gaWNlIGNyZWFtIG9uIGEgaG90IHN1bW1lciBkYXk/IEJlYWNoIFBhcnR5IFNlcmllcyBNaW5lci4iLCJjbiI6IldoYXQncyBiZXR0ZXIgdGhhbiBpY2UgY3JlYW0gb24gYSBob3Qgc3VtbWVyIGRheT8gQmVhY2ggUGFydHkgU2VyaWVzIE1pbmVyLiJ9LCJwb3dlciI6MzUwMDAwLCJ3aWR0aCI6MiwibGV2ZWwiOjAsInR5cGUiOiJiYXNpYyIsImZpbGVuYW1lIjoiaWNlZF9vdXRfY3JlYW0iLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6dHJ1ZSwiYm9udXMiOjIwMCwiaXNfaW5fc2V0IjpmYWxzZX19LHsiaWQiOiI2NzAzZjgzMWEyNmMzN2MzMGYyOWViZjkiLCJpdGVtX2lkIjoiNjI5NjIzYzU1MzBmNDhhOGU3YTkwODk2IiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MTEsInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjYyOTYyM2M1NTMwZjQ4YThlN2E5MDg5NiIsIm5hbWUiOnsiZW4iOiJJY2VkLW91dCctQ3JlYW0iLCJjbiI6IkljZWQtb3V0Jy1DcmVhbSJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6IldoYXQncyBiZXR0ZXIgdGhhbiBpY2UgY3JlYW0gb24gYSBob3Qgc3VtbWVyIGRheT8gQmVhY2ggUGFydHkgU2VyaWVzIE1pbmVyLiIsImNuIjoiV2hhdCdzIGJldHRlciB0aGFuIGljZSBjcmVhbSBvbiBhIGhvdCBzdW1tZXIgZGF5PyBCZWFjaCBQYXJ0eSBTZXJpZXMgTWluZXIuIn0sInBvd2VyIjozNTAwMDAsIndpZHRoIjoyLCJsZXZlbCI6MCwidHlwZSI6ImJhc2ljIiwiZmlsZW5hbWUiOiJpY2VkX291dF9jcmVhbSIsImlzX2Nhbl9iZV9zb2xkX29uX21wIjp0cnVlLCJib251cyI6MjAwLCJpc19pbl9zZXQiOmZhbHNlfX0seyJpZCI6IjY3MDNmODMxYTI2YzM3YzMwZjI5ZWJmZCIsIml0ZW1faWQiOiI2NTAwNDM4NjIyMTZlMTg0MWViYTg1NTIiLCJhbW91bnQiOjEsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjoxMiwidHlwZSI6Im1pbmVyIiwidGl0bGUiOnsiZW4iOiJNaW5lciBSZXdhcmQiLCJjbiI6Ik1pbmVyIFJld2FyZCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIn0sIml0ZW0iOnsiX2lkIjoiNjUwMDQzODYyMjE2ZTE4NDFlYmE4NTUyIiwicG93ZXIiOjc0ODk2NSwid2lkdGgiOjEsIm5hbWUiOnsiZW4iOiJCaXRBY2UiLCJjbiI6IkJpdEFjZSIsImVzIjoiQml0QWNlIiwicHQiOiJCaXRBY2UifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJZb3VyIGNyeXB0byBtaW5pbmcgYWNlIiwiY24iOiJZb3VyIGNyeXB0byBtaW5pbmcgYWNlIiwiZXMiOiJZb3VyIGNyeXB0byBtaW5pbmcgYWNlIiwicHQiOiJZb3VyIGNyeXB0byBtaW5pbmcgYWNlIn0sImNyZWF0ZWRfYnlfdGl0bGUiOnsibGluayI6IiIsInRleHQiOiIifSwibGV2ZWwiOjUsInR5cGUiOiJtZXJnZSIsImZpbGVuYW1lIjoiYml0YWNlIiwiaXNfY2FuX2JlX3NvbGRfb25fbXAiOmZhbHNlLCJib251cyI6OTgsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjcwM2Y4MzFhMjZjMzdjMzBmMjllYzAxIiwiaXRlbV9pZCI6IjY1YmJhMTkyYTE5YzM5NGFhMzA5NjIzZCIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjEzLCJ0eXBlIjoicmFjayIsInRpdGxlIjp7ImVuIjoiUmFjayBUaXRsZSIsImNuIjoiUmFjayBUaXRsZSJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6IlJhY2sgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJSYWNrIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Im5hbWUiOnsiZW4iOiJSZWQgU2lsayA2IiwiY24iOiJSZWQgU2lsayA2In0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTG9va3Mgc21hbGxlciwgYnV0IGhvdyBhYm91dCB0aGUgYm9udXMgJT8gVXNlIGl0IHdpc2VseSwgYW5kIHlvdXIgd2FsbGV0IHdpbGwgZ3JvdyBiaWdnZXIhIiwiY24iOiJMb29rcyBzbWFsbGVyLCBidXQgaG93IGFib3V0IHRoZSBib251cyAlPyBVc2UgaXQgd2lzZWx5LCBhbmQgeW91ciB3YWxsZXQgd2lsbCBncm93IGJpZ2dlciEifSwiX2lkIjoiNjViYmExOTJhMTljMzk0YWEzMDk2MjNkIiwiY2FwYWNpdHkiOjYsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjcwM2Y4MzFhMjZjMzdjMzBmMjllYzA1IiwiaXRlbV9pZCI6IjYzMWY3YTgyODIzOGVkMjgzYTIzNDdiNiIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjE0LCJ0eXBlIjoibWluZXIiLCJ0aXRsZSI6eyJlbiI6Ik1pbmVyIFJld2FyZCIsImNuIjoiTWluZXIgUmV3YXJkIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24ifSwiaXRlbSI6eyJfaWQiOiI2MzFmN2E4MjgyMzhlZDI4M2EyMzQ3YjYiLCJwb3dlciI6OTE4NzUwLCJ3aWR0aCI6MiwibmFtZSI6eyJlbiI6IkljZWQtb3V0Jy1DcmVhbSIsImNuIjoiSWNlZC1vdXQnLUNyZWFtIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiV2hhdCdzIGJldHRlciB0aGFuIGljZSBjcmVhbSBvbiBhIGhvdCBzdW1tZXIgZGF5PyBCZWFjaCBQYXJ0eSBTZXJpZXMgTWluZXIuIiwiY24iOiJXaGF0J3MgYmV0dGVyIHRoYW4gaWNlIGNyZWFtIG9uIGEgaG90IHN1bW1lciBkYXk/IEJlYWNoIFBhcnR5IFNlcmllcyBNaW5lci4ifSwiY3JlYXRlZF9ieV90aXRsZSI6eyJsaW5rIjoiIiwidGV4dCI6IiJ9LCJsZXZlbCI6MSwidHlwZSI6Im1lcmdlIiwiZmlsZW5hbWUiOiJpY2VkX291dF9jcmVhbSIsImlzX2Nhbl9iZV9zb2xkX29uX21wIjp0cnVlLCJib251cyI6MjEwLCJpc19pbl9zZXQiOmZhbHNlfX0seyJpZCI6IjY3MDNmODMxYTI2YzM3YzMwZjI5ZWMwOSIsIml0ZW1faWQiOiI2NzAzZjY0OTcyY2Y3M2IxZDVkMDc3OTQiLCJhbW91bnQiOjEsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjoxNSwidHlwZSI6Im1pbmVyIiwidGl0bGUiOnsiZW4iOiJNaW5lciBSZXdhcmQiLCJjbiI6Ik1pbmVyIFJld2FyZCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIn0sIml0ZW0iOnsiX2lkIjoiNjcwM2Y2NDk3MmNmNzNiMWQ1ZDA3Nzk0IiwicG93ZXIiOjIzMDAwMDAsIndpZHRoIjoyLCJuYW1lIjp7ImVuIjoiRmFsbC1Jbi1Gb29kIiwiY24iOiJGYWxsLUluLUZvb2QiLCJlcyI6IkZhbGwtSW4tRm9vZCIsInB0IjoiRmFsbC1Jbi1Gb29kIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiJ2NhdXNlIGZvb2QgaXMgTG92ZS4iLCJjbiI6IidjYXVzZSBmb29kIGlzIExvdmUuIiwiZXMiOiInY2F1c2UgZm9vZCBpcyBMb3ZlLiIsInB0IjoiJ2NhdXNlIGZvb2QgaXMgTG92ZS4ifSwiY3JlYXRlZF9ieV90aXRsZSI6eyJsaW5rIjoiIiwidGV4dCI6IiJ9LCJsZXZlbCI6MCwidHlwZSI6ImJhc2ljIiwiZmlsZW5hbWUiOiJmYWxsX2luX2Zvb2QiLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6dHJ1ZSwiYm9udXMiOjIzMCwiaXNfaW5fc2V0IjpmYWxzZX19XSwibGV2ZWxzX2NvbmZpZyI6W3sibGV2ZWwiOjEsImxldmVsX3hwIjoxMDAwLCJyZXF1aXJlZF94cCI6MTAwMH0seyJsZXZlbCI6MiwibGV2ZWxfeHAiOjIwMDAsInJlcXVpcmVkX3hwIjozMDAwfSx7ImxldmVsIjozLCJsZXZlbF94cCI6MzAwMCwicmVxdWlyZWRfeHAiOjYwMDB9LHsibGV2ZWwiOjQsImxldmVsX3hwIjo4MDAwLCJyZXF1aXJlZF94cCI6MTQwMDB9LHsibGV2ZWwiOjUsImxldmVsX3hwIjoyMDAwLCJyZXF1aXJlZF94cCI6MTYwMDB9LHsibGV2ZWwiOjYsImxldmVsX3hwIjoxNDAwMDAsInJlcXVpcmVkX3hwIjoxNTYwMDB9LHsibGV2ZWwiOjcsImxldmVsX3hwIjoxNjAwMDAsInJlcXVpcmVkX3hwIjozMTYwMDB9LHsibGV2ZWwiOjgsImxldmVsX3hwIjozNTAwMDAsInJlcXVpcmVkX3hwIjo2NjYwMDB9LHsibGV2ZWwiOjksImxldmVsX3hwIjo5MDAwMCwicmVxdWlyZWRfeHAiOjc1NjAwMH0seyJsZXZlbCI6MTAsImxldmVsX3hwIjoyMzAwMDAsInJlcXVpcmVkX3hwIjo5ODYwMDB9LHsibGV2ZWwiOjExLCJsZXZlbF94cCI6MjYwMDAwLCJyZXF1aXJlZF94cCI6MTI0NjAwMH0seyJsZXZlbCI6MTIsImxldmVsX3hwIjo1NDAwMDAsInJlcXVpcmVkX3hwIjoxNzg2MDAwfSx7ImxldmVsIjoxMywibGV2ZWxfeHAiOjEzMDAwMCwicmVxdWlyZWRfeHAiOjE5MTYwMDB9LHsibGV2ZWwiOjE0LCJsZXZlbF94cCI6MTIwMDAwMCwicmVxdWlyZWRfeHAiOjMxMTYwMDB9LHsibGV2ZWwiOjE1LCJsZXZlbF94cCI6MTUwMDAwMCwicmVxdWlyZWRfeHAiOjQ2MTYwMDB9XX0=";

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
