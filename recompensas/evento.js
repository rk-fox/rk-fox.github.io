// Substitua esta string pelo seu código BASE64
const base64String = "eyJldmVudCI6eyJfaWQiOiI2NmY1MjE4NGUwZGQzNTMwZGFhYWZlZWQiLCJtYXhfeHAiOjU4MjMwMDAsIm1heF9tdWx0aXBsaWVyIjoxMDAwMCwibWF4X2xldmVsIjoyMCwicHJvZ3Jlc3Npb25fZXZlbnRfdHlwZSI6ImRlZmF1bHQiLCJlbmRfZGF0ZSI6IjIwMjQtMDktMjdUMTQ6NTk6MDAuMDAwWiIsImxhc3RfdXBkYXRlZCI6MTcyNzM0MDkzMjQ4MSwiZGVzY3JpcHRpb24iOnsiZW4iOiJDemVjaCBIb2xpZGF5cyIsImNuIjoiQ3plY2ggSG9saWRheXMifSwidGl0bGUiOnsiZW4iOiJDemVjaCBIb2xpZGF5cyIsImNuIjoiQ3plY2ggSG9saWRheXMifX0sInJld2FyZHMiOlt7ImlkIjoiNjZmNTIxODRhMjZjMzdjMzBmYTBkNmU0IiwiaXRlbV9pZCI6IjY0ZWM5MDA4MjJjNzUxMTBiOWIwOTNjMyIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjEsInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjY0ZWM5MDA4MjJjNzUxMTBiOWIwOTNjMyIsInBvd2VyIjozNjAwLCJ3aWR0aCI6MiwibmFtZSI6eyJlbiI6IkJlcmdlZGdlIiwiY24iOiJCZXJnZWRnZSIsImVzIjoiQmVyZ2VkZ2UiLCJwdCI6IkJlcmdlZGdlIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiSXQgaXMgbm90IGEgY29weSBvZiBNZXJnZWRnZS4gTm8uIEFic29sdXRlbHkgbm90LiBCcmFuZC1uZXcgbWluZXIuIEV2ZW4gYmluZGluZyB2YWx1ZSBpcyBkaWZmZXJlbnQhIFRvdGFsbHkgbmV3IG1pbmVyLiIsImNuIjoiSXQgaXMgbm90IGEgY29weSBvZiBNZXJnZWRnZS4gTm8uIEFic29sdXRlbHkgbm90LiBCcmFuZC1uZXcgbWluZXIuIEV2ZW4gYmluZGluZyB2YWx1ZSBpcyBkaWZmZXJlbnQhIFRvdGFsbHkgbmV3IG1pbmVyLiIsImVzIjoiSXQgaXMgbm90IGEgY29weSBvZiBNZXJnZWRnZS4gTm8uIEFic29sdXRlbHkgbm90LiBCcmFuZC1uZXcgbWluZXIuIEV2ZW4gYmluZGluZyB2YWx1ZSBpcyBkaWZmZXJlbnQhIFRvdGFsbHkgbmV3IG1pbmVyLiIsInB0IjoiSXQgaXMgbm90IGEgY29weSBvZiBNZXJnZWRnZS4gTm8uIEFic29sdXRlbHkgbm90LiBCcmFuZC1uZXcgbWluZXIuIEV2ZW4gYmluZGluZyB2YWx1ZSBpcyBkaWZmZXJlbnQhIFRvdGFsbHkgbmV3IG1pbmVyLiJ9LCJjcmVhdGVkX2J5X3RpdGxlIjp7ImxpbmsiOiIiLCJ0ZXh0IjoiIn0sImxldmVsIjowLCJ0eXBlIjoiYmFzaWMiLCJmaWxlbmFtZSI6ImJlcmdlZGdlIiwiaXNfY2FuX2JlX3NvbGRfb25fbXAiOmZhbHNlLCJib251cyI6MCwiaXNfaW5fc2V0IjpmYWxzZX19LHsiaWQiOiI2NmY1MjE4NGEyNmMzN2MzMGZhMGQ2ZTgiLCJpdGVtX2lkIjoiNjRlYzkxNGMyMmM3NTExMGI5YjA5NTRlIiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MiwidHlwZSI6Im1pbmVyIiwidGl0bGUiOnsiZW4iOiJNaW5lciBSZXdhcmQiLCJjbiI6Ik1pbmVyIFJld2FyZCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIn0sIml0ZW0iOnsiX2lkIjoiNjRlYzkxNGMyMmM3NTExMGI5YjA5NTRlIiwiY3JlYXRlZF9ieV90aXRsZSI6eyJsaW5rIjoiIiwidGV4dCI6IiJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6Ikl0IGlzIG5vdCBhIGNvcHkgb2YgTWVyZ2VkZ2UuIE5vLiBBYnNvbHV0ZWx5IG5vdC4gQnJhbmQtbmV3IG1pbmVyLiBFdmVuIGJpbmRpbmcgdmFsdWUgaXMgZGlmZmVyZW50ISBUb3RhbGx5IG5ldyBtaW5lci4iLCJjbiI6Ikl0IGlzIG5vdCBhIGNvcHkgb2YgTWVyZ2VkZ2UuIE5vLiBBYnNvbHV0ZWx5IG5vdC4gQnJhbmQtbmV3IG1pbmVyLiBFdmVuIGJpbmRpbmcgdmFsdWUgaXMgZGlmZmVyZW50ISBUb3RhbGx5IG5ldyBtaW5lci4iLCJlcyI6Ikl0IGlzIG5vdCBhIGNvcHkgb2YgTWVyZ2VkZ2UuIE5vLiBBYnNvbHV0ZWx5IG5vdC4gQnJhbmQtbmV3IG1pbmVyLiBFdmVuIGJpbmRpbmcgdmFsdWUgaXMgZGlmZmVyZW50ISBUb3RhbGx5IG5ldyBtaW5lci4iLCJwdCI6Ikl0IGlzIG5vdCBhIGNvcHkgb2YgTWVyZ2VkZ2UuIE5vLiBBYnNvbHV0ZWx5IG5vdC4gQnJhbmQtbmV3IG1pbmVyLiBFdmVuIGJpbmRpbmcgdmFsdWUgaXMgZGlmZmVyZW50ISBUb3RhbGx5IG5ldyBtaW5lci4ifSwiZmlsZW5hbWUiOiJiZXJnZWRnZSIsImlzX2Nhbl9iZV9zb2xkX29uX21wIjpmYWxzZSwibGV2ZWwiOjEsIm5hbWUiOnsiZW4iOiJCZXJnZWRnZSIsImNuIjoiQmVyZ2VkZ2UiLCJlcyI6IkJlcmdlZGdlIiwicHQiOiJCZXJnZWRnZSJ9LCJwb3dlciI6OTQ1MCwidHlwZSI6Im1lcmdlIiwid2lkdGgiOjIsImJvbnVzIjo4LCJpc19pbl9zZXQiOmZhbHNlfX0seyJpZCI6IjY2ZjUyMTg0YTI2YzM3YzMwZmEwZDZlYyIsIml0ZW1faWQiOm51bGwsImFtb3VudCI6MTAwMDAwMDAwLCJjdXJyZW5jeSI6IlJTVCIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MywidHlwZSI6Im1vbmV5IiwidGl0bGUiOnsiZW4iOiJNb25leSBUaXRsZSIsImNuIjoiTW9uZXkgVGl0bGUifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNb25leSBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1vbmV5IFJld2FyZCBEZXNjcmlwdGlvbiJ9fSx7ImlkIjoiNjZmNTIxODRhMjZjMzdjMzBmYTBkNmYwIiwiaXRlbV9pZCI6IjY0ZWM5MTRjMjJjNzUxMTBiOWIwOTU1OCIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjQsInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjY0ZWM5MTRjMjJjNzUxMTBiOWIwOTU1OCIsImNyZWF0ZWRfYnlfdGl0bGUiOnsibGluayI6IiIsInRleHQiOiIifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJJdCBpcyBub3QgYSBjb3B5IG9mIE1lcmdlZGdlLiBOby4gQWJzb2x1dGVseSBub3QuIEJyYW5kLW5ldyBtaW5lci4gRXZlbiBiaW5kaW5nIHZhbHVlIGlzIGRpZmZlcmVudCEgVG90YWxseSBuZXcgbWluZXIuIiwiY24iOiJJdCBpcyBub3QgYSBjb3B5IG9mIE1lcmdlZGdlLiBOby4gQWJzb2x1dGVseSBub3QuIEJyYW5kLW5ldyBtaW5lci4gRXZlbiBiaW5kaW5nIHZhbHVlIGlzIGRpZmZlcmVudCEgVG90YWxseSBuZXcgbWluZXIuIiwiZXMiOiJJdCBpcyBub3QgYSBjb3B5IG9mIE1lcmdlZGdlLiBOby4gQWJzb2x1dGVseSBub3QuIEJyYW5kLW5ldyBtaW5lci4gRXZlbiBiaW5kaW5nIHZhbHVlIGlzIGRpZmZlcmVudCEgVG90YWxseSBuZXcgbWluZXIuIiwicHQiOiJJdCBpcyBub3QgYSBjb3B5IG9mIE1lcmdlZGdlLiBOby4gQWJzb2x1dGVseSBub3QuIEJyYW5kLW5ldyBtaW5lci4gRXZlbiBiaW5kaW5nIHZhbHVlIGlzIGRpZmZlcmVudCEgVG90YWxseSBuZXcgbWluZXIuIn0sImZpbGVuYW1lIjoiYmVyZ2VkZ2UiLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6ZmFsc2UsImxldmVsIjoyLCJuYW1lIjp7ImVuIjoiQmVyZ2VkZ2UiLCJjbiI6IkJlcmdlZGdlIiwiZXMiOiJCZXJnZWRnZSIsInB0IjoiQmVyZ2VkZ2UifSwicG93ZXIiOjI0ODg1LCJ0eXBlIjoibWVyZ2UiLCJ3aWR0aCI6MiwiYm9udXMiOjIwLCJpc19pbl9zZXQiOmZhbHNlfX0seyJpZCI6IjY2ZjUyMTg0YTI2YzM3YzMwZmEwZDZmNCIsIml0ZW1faWQiOm51bGwsImFtb3VudCI6MTAwMDAwMCwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6NjA0ODAwMDAwLCJyZXF1aXJlZF9sZXZlbCI6NSwidHlwZSI6InBvd2VyIiwidGl0bGUiOnsiZW4iOiJQb3dlciIsImNuIjoiUG93ZXIifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJQb3dlciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6IlBvd2VyIFJld2FyZCBEZXNjcmlwdGlvbiJ9fSx7ImlkIjoiNjZmNTIxODRhMjZjMzdjMzBmYTBkNmY4IiwiaXRlbV9pZCI6bnVsbCwiYW1vdW50IjoyMDAwMDAwMDAsImN1cnJlbmN5IjoiUlNUIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjo2LCJ0eXBlIjoibW9uZXkiLCJ0aXRsZSI6eyJlbiI6Ik1vbmV5IFRpdGxlIiwiY24iOiJNb25leSBUaXRsZSJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6Ik1vbmV5IFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiTW9uZXkgUmV3YXJkIERlc2NyaXB0aW9uIn19LHsiaWQiOiI2NmY1MjE4NGEyNmMzN2MzMGZhMGQ2ZmMiLCJpdGVtX2lkIjoiNjQ0OTBmYzE1NDdjZmFiOWEyNzU5NjM4IiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6NywidHlwZSI6InJhY2siLCJ0aXRsZSI6eyJlbiI6IlJhY2sgVGl0bGUiLCJjbiI6IlJhY2sgVGl0bGUifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJSYWNrIFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiUmFjayBSZXdhcmQgRGVzY3JpcHRpb24ifSwiaXRlbSI6eyJuYW1lIjp7ImVuIjoiQmlvaGF6YXJkIFJhY2sgOCIsImNuIjoiQmlvaGF6YXJkIFJhY2sgOCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6IlRoZSBCaW9oYXphcmQgUmFjayA4IGlzIGEgZmVhcnNvbWUgc2lnaHQgdG8gYmVob2xkLCB3aXRoIGl0cyBlaWdodCBnbG93aW5nIHNsb3RzIGFuZCBkYW5nZXJvdXMtbG9va2luZyBkZXNpZ24uIEl0IHByb3ZpZGVzIGEgYm9udXMgcG93ZXIgb2YgNSUsIHdoaWNoIGFsbG93cyB5b3UgdG8gbWluZSBtb3JlIGNyeXB0b2N1cnJlbmN5IHRoYW4gZXZlciBiZWZvcmUhIEp1c3QgZG9uJ3QgZ2V0IHRvbyBjbG9zZSAtIHRoaXMgcmFjayBtZWFucyBidXNpbmVzcy4iLCJjbiI6IlRoZSBCaW9oYXphcmQgUmFjayA4IGlzIGEgZmVhcnNvbWUgc2lnaHQgdG8gYmVob2xkLCB3aXRoIGl0cyBlaWdodCBnbG93aW5nIHNsb3RzIGFuZCBkYW5nZXJvdXMtbG9va2luZyBkZXNpZ24uIEl0IHByb3ZpZGVzIGEgYm9udXMgcG93ZXIgb2YgNSUsIHdoaWNoIGFsbG93cyB5b3UgdG8gbWluZSBtb3JlIGNyeXB0b2N1cnJlbmN5IHRoYW4gZXZlciBiZWZvcmUhIEp1c3QgZG9uJ3QgZ2V0IHRvbyBjbG9zZSAtIHRoaXMgcmFjayBtZWFucyBidXNpbmVzcy4ifSwiX2lkIjoiNjQ0OTBmYzE1NDdjZmFiOWEyNzU5NjM4IiwiY2FwYWNpdHkiOjgsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjZmNTIxODRhMjZjMzdjMzBmYTBkNzAwIiwiaXRlbV9pZCI6IjVlMmVlNDYwMDQxYjM4NmU3OGI5N2MyYSIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjgsInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjVlMmVlNDYwMDQxYjM4NmU3OGI5N2MyYSIsInBvd2VyIjo3MDAwMCwid2lkdGgiOjIsIm5hbWUiOnsiZW4iOiJEcmVhbSBEZW1vbGlzaGVyIDMwMDAiLCJjbiI6IkRyZWFtIERlbW9saXNoZXIgMzAwMCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6IlBPV0VSIEJFWU9ORCBJTlNBTklUWS4gQnJvdWdodCB0byB5b3UgYnkgbGltaXRlZCBhbm5pdmVyc2FyeSBHT0xERU4gQUJZU1Mgc2VyaWVzLiIsImNuIjoi6LaF57qn55av54uC55S15Yqb77yM55Sx5ZGo5bm057qq5b+16buE6YeRQUJZU1Pns7vliJfluKbnu5nmgqjjgIIifSwibGV2ZWwiOjAsInR5cGUiOiJiYXNpYyIsImZpbGVuYW1lIjoiZHJlYW1fZGVtb2xpc2hlcl8zMDAwIiwiaXNfY2FuX2JlX3NvbGRfb25fbXAiOnRydWUsImJvbnVzIjoyMDAsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjZmNTIxODRhMjZjMzdjMzBmYTBkNzA0IiwiaXRlbV9pZCI6IjYxYjljY2UxNzhkNjNkNjRjZDYyNmZjZCIsImFtb3VudCI6MSwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjksInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjYxYjljY2UxNzhkNjNkNjRjZDYyNmZjZCIsIm5hbWUiOnsiZW4iOiJHaW5nZXJicmVhZCIsImNuIjoiR2luZ2VyYnJlYWQiLCJlcyI6IkdpbmdlcmJyZWFkIiwicHQiOiJHaW5nZXJicmVhZCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6IldoYXQncyBDaHJpc3RtYXMgd2l0aG91dCBjYW5kaWVzPyBHZXQgaW50byB0aGUgZnVsbCBob2xpZGF5IG1pbmluZyBzcGlyaXQgd2l0aCBhIGNvdXBsZSBvZiBnaW5nZXJicmVhZHMhIENocmlzdG1hcyBUaW1lIFNlcmllcyBNaW5lci4iLCJjbiI6IldoYXQncyBDaHJpc3RtYXMgd2l0aG91dCBjYW5kaWVzPyBHZXQgaW50byB0aGUgZnVsbCBob2xpZGF5IG1pbmluZyBzcGlyaXQgd2l0aCBhIGNvdXBsZSBvZiBnaW5nZXJicmVhZHMhIENocmlzdG1hcyBUaW1lIFNlcmllcyBNaW5lci4iLCJlcyI6IldoYXQncyBDaHJpc3RtYXMgd2l0aG91dCBjYW5kaWVzPyBHZXQgaW50byB0aGUgZnVsbCBob2xpZGF5IG1pbmluZyBzcGlyaXQgd2l0aCBhIGNvdXBsZSBvZiBnaW5nZXJicmVhZHMhIENocmlzdG1hcyBUaW1lIFNlcmllcyBNaW5lci4iLCJwdCI6IldoYXQncyBDaHJpc3RtYXMgd2l0aG91dCBjYW5kaWVzPyBHZXQgaW50byB0aGUgZnVsbCBob2xpZGF5IG1pbmluZyBzcGlyaXQgd2l0aCBhIGNvdXBsZSBvZiBnaW5nZXJicmVhZHMhIENocmlzdG1hcyBUaW1lIFNlcmllcyBNaW5lci4ifSwibGV2ZWwiOjAsInR5cGUiOiJiYXNpYyIsInBvd2VyIjo3NTAwMCwid2lkdGgiOjEsImZpbGVuYW1lIjoiZ2luZ2VyYnJlYWQiLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6ZmFsc2UsImNyZWF0ZWRfYnlfdGl0bGUiOnsibGluayI6IiIsInRleHQiOiIifSwiYm9udXMiOjE1MCwiaXNfaW5fc2V0IjpmYWxzZX19LHsiaWQiOiI2NmY1MjE4NGEyNmMzN2MzMGZhMGQ3MDgiLCJpdGVtX2lkIjpudWxsLCJhbW91bnQiOjUwMDAwMDAwMCwiY3VycmVuY3kiOiJSU1QiLCJ0dGxfdGltZSI6MCwicmVxdWlyZWRfbGV2ZWwiOjEwLCJ0eXBlIjoibW9uZXkiLCJ0aXRsZSI6eyJlbiI6Ik1vbmV5IFRpdGxlIiwiY24iOiJNb25leSBUaXRsZSJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6Ik1vbmV5IFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiTW9uZXkgUmV3YXJkIERlc2NyaXB0aW9uIn19LHsiaWQiOiI2NmY1MjE4NGEyNmMzN2MzMGZhMGQ3MGMiLCJpdGVtX2lkIjoiNjQ1YTQ3YTBlY2NkM2M0MzIwNzQ3NGNiIiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MTEsInR5cGUiOiJyYWNrIiwidGl0bGUiOnsiZW4iOiJSYWNrIFRpdGxlIiwiY24iOiJSYWNrIFRpdGxlIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiUmFjayBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6IlJhY2sgUmV3YXJkIERlc2NyaXB0aW9uIn0sIml0ZW0iOnsibmFtZSI6eyJlbiI6IkdvbGRlbiBSYWNrIDgiLCJjbiI6IkdvbGRlbiBSYWNrIDgifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJXaXRoIGVpZ2h0IHNwYWNpb3VzIHNsb3RzIGZvciB5b3VyIG1pbmVycywgdGhlIEdvbGRlbiBSYWNrIDggaXMgdGhlIHVsdGltYXRlIGNob2ljZSBmb3IgZXhwZXJpZW5jZWQgbWluZXJzIHdobyB3YW50IHRvIG1heGltaXplIHRoZWlyIGVhcm5pbmcgcG90ZW50aWFsLiBUaGUgYm9udXMgcG93ZXIgb2YgNiUgZ2l2ZXMgeW91IGV2ZW4gbW9yZSBjcnlwdG8gbm93ISIsImNuIjoiV2l0aCBlaWdodCBzcGFjaW91cyBzbG90cyBmb3IgeW91ciBtaW5lcnMsIHRoZSBHb2xkZW4gUmFjayA4IGlzIHRoZSB1bHRpbWF0ZSBjaG9pY2UgZm9yIGV4cGVyaWVuY2VkIG1pbmVycyB3aG8gd2FudCB0byBtYXhpbWl6ZSB0aGVpciBlYXJuaW5nIHBvdGVudGlhbC4gVGhlIGJvbnVzIHBvd2VyIG9mIDYlIGdpdmVzIHlvdSBldmVuIG1vcmUgY3J5cHRvIG5vdyEifSwiX2lkIjoiNjQ1YTQ3YTBlY2NkM2M0MzIwNzQ3NGNiIiwiY2FwYWNpdHkiOjgsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjZmNTIxODRhMjZjMzdjMzBmYTBkNzEwIiwiaXRlbV9pZCI6bnVsbCwiYW1vdW50IjoxMDAwMDAwMCwiY3VycmVuY3kiOiIiLCJ0dGxfdGltZSI6NjA0ODAwMDAwLCJyZXF1aXJlZF9sZXZlbCI6MTIsInR5cGUiOiJwb3dlciIsInRpdGxlIjp7ImVuIjoiUG93ZXIiLCJjbiI6IlBvd2VyIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiUG93ZXIgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJQb3dlciBSZXdhcmQgRGVzY3JpcHRpb24ifX0seyJpZCI6IjY2ZjUyMTg0YTI2YzM3YzMwZmEwZDcxNCIsIml0ZW1faWQiOiI2MThkMWRkYThmNWVmMjc0NGI3ZDIzN2YiLCJhbW91bnQiOjEsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjoxMywidHlwZSI6Im1pbmVyIiwidGl0bGUiOnsiZW4iOiJNaW5lciBSZXdhcmQiLCJjbiI6Ik1pbmVyIFJld2FyZCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIn0sIml0ZW0iOnsiX2lkIjoiNjE4ZDFkZGE4ZjVlZjI3NDRiN2QyMzdmIiwibmFtZSI6eyJlbiI6IlhMWi0xIiwiY24iOiJYTFotMSJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6IlhMIGlzIGZvciA0MCwwMDAsIFogYWRkcyBhIHplcm8sIGFuZCB3ZSBmb3Jnb3QgaG93IHRvIHdyaXRlIC0xIGluIHJvbWFuIGRpZ2l0cy4gU28sIDM5OSw5OTkgY29pbnMgaXMgdGhlIHRoZW9yZXRpY2FsIGxpbWl0LCB3aWxsIHlvdSB0ZXN0PyIsImNuIjoiWEwgaXMgZm9yIDQwLDAwMCwgWiBhZGRzIGEgemVybywgYW5kIHdlIGZvcmdvdCBob3cgdG8gd3JpdGUgLTEgaW4gcm9tYW4gZGlnaXRzLiBTbywgMzk5LDk5OSBjb2lucyBpcyB0aGUgdGhlb3JldGljYWwgbGltaXQsIHdpbGwgeW91IHRlc3Q/In0sInBvd2VyIjoxMDAwMDAsIndpZHRoIjoyLCJsZXZlbCI6MCwidHlwZSI6ImJhc2ljIiwiZmlsZW5hbWUiOiJ4bHpfMSIsImlzX2Nhbl9iZV9zb2xkX29uX21wIjp0cnVlLCJib251cyI6MTUwLCJpc19pbl9zZXQiOmZhbHNlfX0seyJpZCI6IjY2ZjUyMTg0YTI2YzM3YzMwZmEwZDcxOSIsIml0ZW1faWQiOiI2NjJiYmQ2MDhmOGRmZWM5Y2YyNGE4ZjIiLCJhbW91bnQiOjEsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjoxNCwidHlwZSI6Im1pbmVyIiwidGl0bGUiOnsiZW4iOiJNaW5lciBSZXdhcmQiLCJjbiI6Ik1pbmVyIFJld2FyZCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiTWluZXIgUmV3YXJkIERlc2NyaXB0aW9uIn0sIml0ZW0iOnsiX2lkIjoiNjYyYmJkNjA4ZjhkZmVjOWNmMjRhOGYyIiwicG93ZXIiOjI2MjAwMCwid2lkdGgiOjEsIm5hbWUiOnsiZW4iOiJCb24gVm95YWdlIiwiY24iOiJCb24gVm95YWdlIiwiZXMiOiJCb24gVm95YWdlIiwicHQiOiJCb24gVm95YWdlIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiRGVzcGl0ZSBpdHMgc21hbGwgc2l6ZSwgZG9uJ3QgYmUgZm9vbGVkIGJ5IHRoZSBsb29rcy4gV2l0aCBpdHMgc2xlZWssIGNvbXBhY3QgZGVzaWduIHlvdSB3aWxsIGdldCB0byBzb21lIGdvb2QgY3J5cHRvIHBsYWNlcyBpbiBubyB0aW1lIHdpdGggZXZlcnl0aGluZyB5b3UgbmVlZCAtIGdyZWF0IHBvd2VyISIsImNuIjoiRGVzcGl0ZSBpdHMgc21hbGwgc2l6ZSwgZG9uJ3QgYmUgZm9vbGVkIGJ5IHRoZSBsb29rcy4gV2l0aCBpdHMgc2xlZWssIGNvbXBhY3QgZGVzaWduIHlvdSB3aWxsIGdldCB0byBzb21lIGdvb2QgY3J5cHRvIHBsYWNlcyBpbiBubyB0aW1lIHdpdGggZXZlcnl0aGluZyB5b3UgbmVlZCAtIGdyZWF0IHBvd2VyISIsImVzIjoiRGVzcGl0ZSBpdHMgc21hbGwgc2l6ZSwgZG9uJ3QgYmUgZm9vbGVkIGJ5IHRoZSBsb29rcy4gV2l0aCBpdHMgc2xlZWssIGNvbXBhY3QgZGVzaWduIHlvdSB3aWxsIGdldCB0byBzb21lIGdvb2QgY3J5cHRvIHBsYWNlcyBpbiBubyB0aW1lIHdpdGggZXZlcnl0aGluZyB5b3UgbmVlZCAtIGdyZWF0IHBvd2VyISIsInB0IjoiRGVzcGl0ZSBpdHMgc21hbGwgc2l6ZSwgZG9uJ3QgYmUgZm9vbGVkIGJ5IHRoZSBsb29rcy4gV2l0aCBpdHMgc2xlZWssIGNvbXBhY3QgZGVzaWduIHlvdSB3aWxsIGdldCB0byBzb21lIGdvb2QgY3J5cHRvIHBsYWNlcyBpbiBubyB0aW1lIHdpdGggZXZlcnl0aGluZyB5b3UgbmVlZCAtIGdyZWF0IHBvd2VyISJ9LCJjcmVhdGVkX2J5X3RpdGxlIjp7ImxpbmsiOiIiLCJ0ZXh0IjoiIn0sImxldmVsIjowLCJ0eXBlIjoiYmFzaWMiLCJmaWxlbmFtZSI6ImJvbl92b3lhZ2UiLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6dHJ1ZSwiYm9udXMiOjAsImlzX2luX3NldCI6ZmFsc2V9fSx7ImlkIjoiNjZmNTIxODRhMjZjMzdjMzBmYTBkNzFlIiwiaXRlbV9pZCI6bnVsbCwiYW1vdW50IjoxMDAwMDAwMDAwLCJjdXJyZW5jeSI6IlJTVCIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MTUsInR5cGUiOiJtb25leSIsInRpdGxlIjp7ImVuIjoiTW9uZXkgVGl0bGUiLCJjbiI6Ik1vbmV5IFRpdGxlIn0sImRlc2NyaXB0aW9uIjp7ImVuIjoiTW9uZXkgUmV3YXJkIERlc2NyaXB0aW9uIiwiY24iOiJNb25leSBSZXdhcmQgRGVzY3JpcHRpb24ifX0seyJpZCI6IjY2ZjUyMTg0YTI2YzM3YzMwZmEwZDcyNCIsIml0ZW1faWQiOiI2NGQ2Mjk5YjZkNzAwODE0ODU3NWRmNzkiLCJhbW91bnQiOjEsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjAsInJlcXVpcmVkX2xldmVsIjoxNiwidHlwZSI6InJhY2siLCJ0aXRsZSI6eyJlbiI6IlJhY2sgVGl0bGUiLCJjbiI6IlJhY2sgVGl0bGUifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJSYWNrIFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiUmFjayBSZXdhcmQgRGVzY3JpcHRpb24ifSwiaXRlbSI6eyJuYW1lIjp7ImVuIjoiU2lsdmVyIFJhY2sgOCIsImNuIjoiU2lsdmVyIFJhY2sgOCJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6IldoZW4geW91IGFza2VkIHRoZSBzZWxsZXIgYWJvdXQgdGhlIG1hdGVyaWFsIG9mIHRoaXMgcmFjaywgaGUgam9raW5nbHkgcmVzcG9uZGVkIHdpdGggJ1NpbHZlci4nIEl0IHNlZW1zIGhlIGhhZCBxdWl0ZSBhbiB1bnVzdWFsIHNlbnNlIG9mIGh1bW9yLCBidXQgdGhpcyBzdHVyZHkgYW5kIHNwYWNpb3VzICdTaWx2ZXInIFJhY2sgZm9yIG1pbmVycyBwcm92ZXMgdGhhdCB0aGVyZSdzIG1vcmUgdG8gaXQgdGhhbiBtZWV0cyB0aGUgZXllLiIsImNuIjoiV2hlbiB5b3UgYXNrZWQgdGhlIHNlbGxlciBhYm91dCB0aGUgbWF0ZXJpYWwgb2YgdGhpcyByYWNrLCBoZSBqb2tpbmdseSByZXNwb25kZWQgd2l0aCAnU2lsdmVyLicgSXQgc2VlbXMgaGUgaGFkIHF1aXRlIGFuIHVudXN1YWwgc2Vuc2Ugb2YgaHVtb3IsIGJ1dCB0aGlzIHN0dXJkeSBhbmQgc3BhY2lvdXMgJ1NpbHZlcicgUmFjayBmb3IgbWluZXJzIHByb3ZlcyB0aGF0IHRoZXJlJ3MgbW9yZSB0byBpdCB0aGFuIG1lZXRzIHRoZSBleWUuIn0sIl9pZCI6IjY0ZDYyOTliNmQ3MDA4MTQ4NTc1ZGY3OSIsImNhcGFjaXR5Ijo4LCJpc19pbl9zZXQiOmZhbHNlfX0seyJpZCI6IjY2ZjUyMTg0YTI2YzM3YzMwZmEwZDcyOCIsIml0ZW1faWQiOm51bGwsImFtb3VudCI6MjUwMDAwMDAsImN1cnJlbmN5IjoiIiwidHRsX3RpbWUiOjYwNDgwMDAwMCwicmVxdWlyZWRfbGV2ZWwiOjE3LCJ0eXBlIjoicG93ZXIiLCJ0aXRsZSI6eyJlbiI6IlBvd2VyIiwiY24iOiJQb3dlciJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6IlBvd2VyIFJld2FyZCBEZXNjcmlwdGlvbiIsImNuIjoiUG93ZXIgUmV3YXJkIERlc2NyaXB0aW9uIn19LHsiaWQiOiI2NmY1MjE4NGEyNmMzN2MzMGZhMGQ3MmMiLCJpdGVtX2lkIjoiNjJmM2MxNmM4MWIxYzhlNjkyMGI1OGM4IiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MTgsInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjYyZjNjMTZjODFiMWM4ZTY5MjBiNThjOCIsIm5hbWUiOnsiZW4iOiJGdWxsIENpcmNsZSIsImNuIjoiRnVsbCBDaXJjbGUifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJBcyB0aGUgU3VuIHR1cm5zIHJlZCwgYXMgdGhlIGNsb3VkcyBzaGluZSwgSGFtc3RlciBpcyB3YXRjaGluZyB0aGUgR29sZGVuIEhvdXIuIiwiY24iOiJBcyB0aGUgU3VuIHR1cm5zIHJlZCwgYXMgdGhlIGNsb3VkcyBzaGluZSwgSGFtc3RlciBpcyB3YXRjaGluZyB0aGUgR29sZGVuIEhvdXIuIn0sInBvd2VyIjo0NjUwMDAsIndpZHRoIjoyLCJsZXZlbCI6MCwidHlwZSI6ImJhc2ljIiwiZmlsZW5hbWUiOiJmdWxsX2NpcmNsZSIsImlzX2Nhbl9iZV9zb2xkX29uX21wIjp0cnVlLCJib251cyI6MCwiaXNfaW5fc2V0IjpmYWxzZX19LHsiaWQiOiI2NmY1MjE4NGEyNmMzN2MzMGZhMGQ3MzAiLCJpdGVtX2lkIjoiNjQxMDhiYmM1NDdjZmFiOWEyMzU2MmI3IiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MTksInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjY0MTA4YmJjNTQ3Y2ZhYjlhMjM1NjJiNyIsInBvd2VyIjo1MzM1MDAsIndpZHRoIjoyLCJuYW1lIjp7ImVuIjoiTGVwcmVDb2luIiwiY24iOiJMZXByZUNvaW4ifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJLbm93biBmb3IgdGhlaXIgZ3JlZWRpbmVzcywgbGVwcmVjaGF1bnMgYXJlIG5ldmVydGhlbGVzcyBlYWdlciB0byBtaW5lIGNvaW5zLCBzaW5jZSB0aGV54oCZcmUgSGFtc3RlcuKAmXMgZnJpZW5kcyEgU2l6ZSBtYXR0ZXJzIHNvbWV0aW1lcy4gQ3JlYXRlZCBieSBEZWFuIFdhbHRlci4iLCJjbiI6Iktub3duIGZvciB0aGVpciBncmVlZGluZXNzLCBsZXByZWNoYXVucyBhcmUgbmV2ZXJ0aGVsZXNzIGVhZ2VyIHRvIG1pbmUgY29pbnMsIHNpbmNlIHRoZXnigJlyZSBIYW1zdGVy4oCZcyBmcmllbmRzISBTaXplIG1hdHRlcnMgc29tZXRpbWVzLiBDcmVhdGVkIGJ5IERlYW4gV2FsdGVyLiJ9LCJsZXZlbCI6MCwidHlwZSI6ImJhc2ljIiwiZmlsZW5hbWUiOiJsZXByZWNvaW4iLCJpc19jYW5fYmVfc29sZF9vbl9tcCI6dHJ1ZSwiYm9udXMiOjMwMCwiaXNfaW5fc2V0IjpmYWxzZX19LHsiaWQiOiI2NmY1MjE4NGEyNmMzN2MzMGZhMGQ3MzQiLCJpdGVtX2lkIjoiNjZmMmFlNmRlMGRkMzUzMGRhYTU3NTg1IiwiYW1vdW50IjoxLCJjdXJyZW5jeSI6IiIsInR0bF90aW1lIjowLCJyZXF1aXJlZF9sZXZlbCI6MjAsInR5cGUiOiJtaW5lciIsInRpdGxlIjp7ImVuIjoiTWluZXIgUmV3YXJkIiwiY24iOiJNaW5lciBSZXdhcmQifSwiZGVzY3JpcHRpb24iOnsiZW4iOiJNaW5lciBSZXdhcmQgRGVzY3JpcHRpb24iLCJjbiI6Ik1pbmVyIFJld2FyZCBEZXNjcmlwdGlvbiJ9LCJpdGVtIjp7Il9pZCI6IjY2ZjJhZTZkZTBkZDM1MzBkYWE1NzU4NSIsInBvd2VyIjoxMDAwMDAwLCJ3aWR0aCI6MiwibmFtZSI6eyJlbiI6IlByYWd1ZSBPcmxvaiIsImNuIjoiUHJhZ3VlIE9ybG9qIiwiZXMiOiJQcmFndWUgT3Jsb2oiLCJwdCI6IlByYWd1ZSBPcmxvaiJ9LCJkZXNjcmlwdGlvbiI6eyJlbiI6Ikluc3BpcmVkIGJ5IHRoZSBhbmNpZW50IFByYWd1ZSBPcmxvaiwgdGhpcyBtaW5lciB0dXJucyBiYWNrIHRpbWUgd2l0aCBwcmVjaXNpb24sIHN5bmNpbmcgd2l0aCB0aGUgZXRlcm5hbCByaHl0aG0gb2YgY3J5cHRvIG1pbmluZy4gRXZlcnkgdGljayBvZiB0aGUgYWxnb3JpdGhtIGJyaW5ncyB3ZWFsdGggY2xvc2VyLCBmb3JnaW5nIHByb2ZpdHMgYXMgdGltZWxlc3MgYXMgdGhlIGdlYXJzIG9mIHRoaXMgbGVnZW5kYXJ5IGNsb2NrLiIsImNuIjoiSW5zcGlyZWQgYnkgdGhlIGFuY2llbnQgUHJhZ3VlIE9ybG9qLCB0aGlzIG1pbmVyIHR1cm5zIGJhY2sgdGltZSB3aXRoIHByZWNpc2lvbiwgc3luY2luZyB3aXRoIHRoZSBldGVybmFsIHJoeXRobSBvZiBjcnlwdG8gbWluaW5nLiBFdmVyeSB0aWNrIG9mIHRoZSBhbGdvcml0aG0gYnJpbmdzIHdlYWx0aCBjbG9zZXIsIGZvcmdpbmcgcHJvZml0cyBhcyB0aW1lbGVzcyBhcyB0aGUgZ2VhcnMgb2YgdGhpcyBsZWdlbmRhcnkgY2xvY2suIiwiZXMiOiJJbnNwaXJlZCBieSB0aGUgYW5jaWVudCBQcmFndWUgT3Jsb2osIHRoaXMgbWluZXIgdHVybnMgYmFjayB0aW1lIHdpdGggcHJlY2lzaW9uLCBzeW5jaW5nIHdpdGggdGhlIGV0ZXJuYWwgcmh5dGhtIG9mIGNyeXB0byBtaW5pbmcuIEV2ZXJ5IHRpY2sgb2YgdGhlIGFsZ29yaXRobSBicmluZ3Mgd2VhbHRoIGNsb3NlciwgZm9yZ2luZyBwcm9maXRzIGFzIHRpbWVsZXNzIGFzIHRoZSBnZWFycyBvZiB0aGlzIGxlZ2VuZGFyeSBjbG9jay4iLCJwdCI6Ikluc3BpcmVkIGJ5IHRoZSBhbmNpZW50IFByYWd1ZSBPcmxvaiwgdGhpcyBtaW5lciB0dXJucyBiYWNrIHRpbWUgd2l0aCBwcmVjaXNpb24sIHN5bmNpbmcgd2l0aCB0aGUgZXRlcm5hbCByaHl0aG0gb2YgY3J5cHRvIG1pbmluZy4gRXZlcnkgdGljayBvZiB0aGUgYWxnb3JpdGhtIGJyaW5ncyB3ZWFsdGggY2xvc2VyLCBmb3JnaW5nIHByb2ZpdHMgYXMgdGltZWxlc3MgYXMgdGhlIGdlYXJzIG9mIHRoaXMgbGVnZW5kYXJ5IGNsb2NrLiJ9LCJjcmVhdGVkX2J5X3RpdGxlIjp7ImxpbmsiOiIiLCJ0ZXh0IjoiIn0sImxldmVsIjowLCJ0eXBlIjoiYmFzaWMiLCJmaWxlbmFtZSI6InByYWd1ZV9vcmxvaiIsImlzX2Nhbl9iZV9zb2xkX29uX21wIjp0cnVlLCJib251cyI6MzUwLCJpc19pbl9zZXQiOmZhbHNlfX1dLCJsZXZlbHNfY29uZmlnIjpbeyJsZXZlbCI6MSwibGV2ZWxfeHAiOjEwMDAsInJlcXVpcmVkX3hwIjoxMDAwfSx7ImxldmVsIjoyLCJsZXZlbF94cCI6MjAwMCwicmVxdWlyZWRfeHAiOjMwMDB9LHsibGV2ZWwiOjMsImxldmVsX3hwIjo0MDAwLCJyZXF1aXJlZF94cCI6NzAwMH0seyJsZXZlbCI6NCwibGV2ZWxfeHAiOjgwMDAsInJlcXVpcmVkX3hwIjoxNTAwMH0seyJsZXZlbCI6NSwibGV2ZWxfeHAiOjEyMDAwLCJyZXF1aXJlZF94cCI6MjcwMDB9LHsibGV2ZWwiOjYsImxldmVsX3hwIjoxNjAwMCwicmVxdWlyZWRfeHAiOjQzMDAwfSx7ImxldmVsIjo3LCJsZXZlbF94cCI6NjAwMDAsInJlcXVpcmVkX3hwIjoxMDMwMDB9LHsibGV2ZWwiOjgsImxldmVsX3hwIjoxMTAwMDAsInJlcXVpcmVkX3hwIjoyMTMwMDB9LHsibGV2ZWwiOjksImxldmVsX3hwIjoxMjAwMDAsInJlcXVpcmVkX3hwIjozMzMwMDB9LHsibGV2ZWwiOjEwLCJsZXZlbF94cCI6MTUwMDAwLCJyZXF1aXJlZF94cCI6NDgzMDAwfSx7ImxldmVsIjoxMSwibGV2ZWxfeHAiOjIyMDAwMCwicmVxdWlyZWRfeHAiOjcwMzAwMH0seyJsZXZlbCI6MTIsImxldmVsX3hwIjoyNTAwMDAsInJlcXVpcmVkX3hwIjo5NTMwMDB9LHsibGV2ZWwiOjEzLCJsZXZlbF94cCI6MjgwMDAwLCJyZXF1aXJlZF94cCI6MTIzMzAwMH0seyJsZXZlbCI6MTQsImxldmVsX3hwIjozMTAwMDAsInJlcXVpcmVkX3hwIjoxNTQzMDAwfSx7ImxldmVsIjoxNSwibGV2ZWxfeHAiOjMzMDAwMCwicmVxdWlyZWRfeHAiOjE4NzMwMDB9LHsibGV2ZWwiOjE2LCJsZXZlbF94cCI6MzYwMDAwLCJyZXF1aXJlZF94cCI6MjIzMzAwMH0seyJsZXZlbCI6MTcsImxldmVsX3hwIjozOTAwMDAsInJlcXVpcmVkX3hwIjoyNjIzMDAwfSx7ImxldmVsIjoxOCwibGV2ZWxfeHAiOjUwMDAwMCwicmVxdWlyZWRfeHAiOjMxMjMwMDB9LHsibGV2ZWwiOjE5LCJsZXZlbF94cCI6NzAwMDAwLCJyZXF1aXJlZF94cCI6MzgyMzAwMH0seyJsZXZlbCI6MjAsImxldmVsX3hwIjoyMDAwMDAwLCJyZXF1aXJlZF94cCI6NTgyMzAwMH1dfQ==";

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
