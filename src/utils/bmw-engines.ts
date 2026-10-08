/**
 * Mapeo exhaustivo de motorizaciones icónicas por chasis y generaciones de BMW
 * Para que búsquedas como "320i E46", "330ci", "325i E30", "135i E82", "530d E39", "M140i F20",
 * "M3 E46", "M5 E60", "335i E92", "M2 F87", "M240i", "540i B58", etc.
 * tengan correspondencia directa y permitan conmutar motorizaciones con máxima precisión financiera.
 */
export const POPULAR_ENGINES_MAP: Record<string, string[]> = {
  // Serie 3
  'E30': ['316i (100 CV)', '318i (113 CV)', '318is 16V (136 CV)', '320i (129 CV)', '323i (150 CV)', '325i (170 CV)', '325ix 4x4 (170 CV)', '324d (86 CV)', '324td Turbo (115 CV)', 'M3 2.3 S14 (200 CV)', 'M3 2.5 Sport Evolution (238 CV)'],
  'E36': ['316i (102 CV)', '318i (115 CV)', '318is (140 CV)', '320i (150 CV)', '323i (170 CV)', '325i (192 CV)', '328i (193 CV)', '318tds (90 CV)', '325td (115 CV)', '325tds (143 CV)', 'M3 3.0 S50 (286 CV)', 'M3 3.2 S50 (321 CV)', 'M3 GT (295 CV)'],
  'E46': ['316i (105/115 CV)', '318i/318ci (118/143 CV)', '320i/320ci (150/170 CV)', '323i/323ci (170 CV)', '325i/325ci (192 CV)', '328i/328ci (193 CV)', '330i/330ci M54 (231 CV)', '318d (115 CV)', '320d (136/150 CV)', '330d M57 (184/204 CV)', 'M3 3.2 S54 (343 CV)', 'M3 CSL (360 CV)'],
  'E90': ['316i (122 CV)', '318i (129/143 CV)', '320i (150/170 CV)', '320si Homologación (173 CV)', '325i N52/N53 (218 CV)', '330i N52/N53 (258/272 CV)', '335i BiTurbo N54/N55 (306 CV)', '318d (122/143 CV)', '320d (163/177/184 CV)', '325d (197/204 CV)', '330d (231/245 CV)', '335d BiTurbo (286 CV)', 'M3 Berlina V8 S65 (420 CV)'],
  'E92': ['320i Coupé (170 CV)', '325i Coupé (218 CV)', '330i Coupé (272 CV)', '335i BiTurbo N54 (306 CV)', '335i TwinScroll N55 (306 CV)', '335is DCT (326 CV)', '320d Coupé (177/184 CV)', '330d Coupé (245 CV)', '335d Coupé BiTurbo (286 CV)', 'M3 Coupé V8 S65 (420 CV)', 'M3 GTS V8 4.4 (450 CV)'],
  'F30': ['316i (136 CV)', '318i (136 CV)', '320i (184 CV)', '328i (245 CV)', '330i B48 (252 CV)', '335i N55 (306 CV)', '340i B58 (326 CV)', '316d (116 CV)', '318d (143/150 CV)', '320d (184/190 CV)', '325d (218/224 CV)', '330d (258 CV)', '335d xDrive (313 CV)', '330e PHEV (252 CV)', 'ActiveHybrid 3 (340 CV)'],
  'G20': ['318i (156 CV)', '320i (184 CV)', '330i (258/245 CV)', 'M340i xDrive B58 (374 CV)', '318d (150 CV)', '320d (190 CV)', '330d (265/286 CV)', 'M340d xDrive (340 CV)', '320e PHEV (204 CV)', '330e PHEV (292 CV)'],
  
  // M3 / M4 / M2 Específicos
  'F80': ['M3 Estándar (431 CV)', 'M3 Competition (450 CV)', 'M3 CS (460 CV)'],
  'G80': ['M3 Manual (480 CV)', 'M3 Competition (510 CV)', 'M3 Competition xDrive (510/530 CV)', 'M3 CS (550 CV)', 'M3 Touring xDrive (510 CV)'],
  'F82': ['M4 Coupé (431 CV)', 'M4 Competition (450 CV)', 'M4 CS (460 CV)', 'M4 GTS (500 CV)'],
  'G82': ['M4 Coupé (480 CV)', 'M4 Competition (510 CV)', 'M4 Competition xDrive (530 CV)', 'M4 CSL (550 CV)'],
  'F87': ['M2 N55 (370 CV)', 'M2 Competition S55 (410 CV)', 'M2 CS (450 CV)'],
  'G87': ['M2 Coupé B58/S58 (460 CV)', 'M2 2025 LCI (480 CV)'],

  // Serie 1
  'E87': ['116i (115/122 CV)', '118i (129/143 CV)', '120i (150/170 CV)', '130i 6L N52 (265 CV)', '116d (116 CV)', '118d (122/143 CV)', '120d (163/177 CV)', '123d BiTurbo (204 CV)'],
  'E82': ['120i Coupé (170 CV)', '125i Coupé (218 CV)', '128i Coupé (230 CV)', '135i N54/N55 (306 CV)', '118d Coupé (143 CV)', '120d Coupé (177 CV)', '123d Coupé (204 CV)', 'Serie 1 M Coupé (340 CV)'],
  'F20': ['114i (102 CV)', '116i (136 CV)', '118i (136/170 CV)', '120i (177/184 CV)', '125i (218/224 CV)', 'M135i N55 (320/326 CV)', 'M140i B58 (340 CV)', '114d (95 CV)', '116d (116 CV)', '118d (143/150 CV)', '120d (184/190 CV)', '125d (218/224 CV)'],
  'F40': ['116i (109 CV)', '118i (136/140 CV)', '120i (178 CV)', '128ti (265 CV)', 'M135i xDrive (306 CV)', '116d (116 CV)', '118d (150 CV)', '120d (190 CV)'],

  // Serie 2
  'F22': ['218i (136 CV)', '220i (184 CV)', '228i (245 CV)', '230i (252 CV)', 'M235i N55 (326 CV)', 'M240i B58 (340 CV)', '218d (143/150 CV)', '220d (184/190 CV)', '225d (218/224 CV)'],
  'G42': ['218i (156 CV)', '220i (184 CV)', '230i (245 CV)', 'M240i xDrive B58 (374 CV)', '220d Mild-Hybrid (190 CV)'],

  // Serie 4
  'F32': ['420i (184 CV)', '428i (245 CV)', '430i (252 CV)', '435i N55 (306 CV)', '440i B58 (326 CV)', '420d (184/190 CV)', '425d (218/224 CV)', '430d (258 CV)', '435d xDrive BiTurbo (313 CV)'],
  'G22': ['420i (184 CV)', '430i (245/258 CV)', 'M440i xDrive B58 (374 CV)', '420d (190 CV)', '430d (286 CV)', 'M440d xDrive (340 CV)'],

  // Serie 5
  'E39': ['520i (150/170 CV)', '523i (170 CV)', '525i (192 CV)', '528i (193 CV)', '530i M54 (231 CV)', '535i V8 (235/245 CV)', '540i V8 (286 CV)', '520d (136 CV)', '525td/tds (115/143 CV)', '525d (163 CV)', '530d M57 (184/193 CV)', 'M5 V8 S62 (400 CV)'],
  'E60': ['520i (170 CV)', '523i (177/190 CV)', '525i (192/218 CV)', '530i (231/258/272 CV)', '540i V8 (306 CV)', '545i V8 (333 CV)', '550i V8 (367 CV)', '520d (163/177 CV)', '525d (177/197 CV)', '530d (218/231/235 CV)', '535d BiTurbo (272/286 CV)', 'M5 V10 S85 (507 CV)'],
  'F10': ['520i (184 CV)', '528i (245/258 CV)', '530i (272 CV)', '535i N55 (306 CV)', '550i V8 BiTurbo (408/450 CV)', '518d (143/150 CV)', '520d (184/190 CV)', '525d (204/218 CV)', '530d (245/258 CV)', '535d BiTurbo (300/313 CV)', 'M550d xDrive TriTurbo (381 CV)', 'ActiveHybrid 5 (340 CV)', 'M5 V8 BiTurbo (560/575 CV)'],
  'G30': ['520i (184 CV)', '530i (252 CV)', '540i B58 (340 CV)', 'M550i xDrive V8 (462/530 CV)', '520d (190 CV)', '525d (231 CV)', '530d (265/286 CV)', '540d (320/340 CV)', 'M550d QuadTurbo (400 CV)', '530e PHEV (252/292 CV)', '545e PHEV 6L (394 CV)', 'M5 F90 (600/625 CV)', 'M5 CS (635 CV)'],

  // Serie 6 & 8
  'E63': ['630i (258/272 CV)', '645Ci V8 (333 CV)', '650i V8 (367 CV)', '635d BiTurbo (286 CV)', 'M6 V10 S85 (507 CV)'],
  'F12': ['640i (320 CV)', '650i V8 (408/450 CV)', '640d (313 CV)', 'M6 V8 BiTurbo (560/600 CV)'],
  'G15': ['840i B58 (333/340 CV)', 'M850i xDrive V8 (530 CV)', '840d xDrive (320/340 CV)', 'M8 Competition (625 CV)'],

  // Serie 7
  'E38': ['728i (193 CV)', '730i V8 (218 CV)', '735i V8 (235 CV)', '740i V8 (286 CV)', '750i V12 (326 CV)', '725tds (143 CV)', '730d (184/193 CV)', '740d V8 BiTurbo (245 CV)'],
  'E65': ['730i (231/258 CV)', '735i (272 CV)', '740i (306 CV)', '745i V8 (333 CV)', '750i V8 (367 CV)', '760i V12 (445 CV)', '730d (218/231 CV)', '740d (258 CV)', '745d V8 (300/330 CV)'],
  'F01': ['730i (258 CV)', '740i (320/326 CV)', '750i V8 (408/450 CV)', '760i V12 BiTurbo (544 CV)', '730d (245/258 CV)', '740d (306/313 CV)', '750d TriTurbo (381 CV)', 'ActiveHybrid 7 (354 CV)'],
  'G11': ['730i (258 CV)', '740i (326/340 CV)', '750i V8 (450/530 CV)', 'M760Li xDrive V12 (610/585 CV)', '730d (265/286 CV)', '740d (320/340 CV)', '750d QuadTurbo (400 CV)', '740e/745e PHEV (326/394 CV)'],

  // Z Series
  'E85': ['2.0i (150 CV)', '2.2i (170 CV)', '2.5i (177/192 CV)', '2.5si (218 CV)', '3.0i M54 (231 CV)', '3.0si N52 (265 CV)', 'Z4 M Roadster S54 (343 CV)'],
  'E86': ['3.0si Coupé N52 (265 CV)', 'Z4 M Coupé S54 (343 CV)'],
  'E89': ['sDrive18i (156 CV)', 'sDrive20i (184 CV)', 'sDrive23i 6L (204 CV)', 'sDrive28i (245 CV)', 'sDrive30i 6L (258 CV)', 'sDrive35i N54 (306 CV)', 'sDrive35is N54 (340 CV)'],
  'G29': ['sDrive20i (197 CV)', 'sDrive30i (258 CV)', 'M40i B58 (340 CV)'],

  // X Series (SUV)
  'E53': ['3.0i (231 CV)', '4.4i V8 (286/320 CV)', '4.6is V8 (347 CV)', '4.8is V8 (360 CV)', '3.0d (184/218 CV)'],
  'E70': ['3.0si (272 CV)', 'xDrive30i (272 CV)', '4.8i V8 (355 CV)', 'xDrive50i V8 BiTurbo (408 CV)', '3.0d (235 CV)', 'xDrive30d (245 CV)', '3.0sd (286 CV)', 'xDrive35d (286 CV)', 'xDrive40d (306 CV)', 'M50d TriTurbo (381 CV)', 'X5 M V8 BiTurbo (555 CV)'],
  'F15': ['sDrive25d (218/231 CV)', 'xDrive25d (218/231 CV)', 'xDrive30d (258 CV)', 'xDrive40d (313 CV)', 'M50d TriTurbo (381 CV)', 'sDrive35i (306 CV)', 'xDrive35i (306 CV)', 'xDrive50i V8 (450 CV)', 'xDrive40e PHEV (313 CV)', 'X5 M (575 CV)'],
  'G05': ['sDrive40i/xDrive40i B58 (340/381 CV)', 'xDrive50i V8 (462 CV)', 'M50i V8 (530 CV)', 'M60i V8 Mild-Hybrid (530 CV)', 'xDrive25d (231 CV)', 'xDrive30d (265/286/298 CV)', 'xDrive40d (340/352 CV)', 'M50d QuadTurbo (400 CV)', 'xDrive45e PHEV (394 CV)', 'xDrive50e PHEV (489 CV)', 'X5 M Competition (625 CV)'],
  'E83': ['2.0i (150 CV)', '2.5i (192 CV)', '2.5si (218 CV)', '3.0i (231 CV)', '3.0si (272 CV)', '2.0d (150/177 CV)', '3.0d (204/218 CV)', '3.0sd BiTurbo (286 CV)'],
  'F25': ['sDrive20i (184 CV)', 'xDrive20i (184 CV)', 'xDrive28i (245/258 CV)', 'xDrive35i (306 CV)', 'sDrive18d (143/150 CV)', 'xDrive20d (184/190 CV)', 'xDrive30d (258 CV)', 'xDrive35d (313 CV)'],
  'G01': ['xDrive20i (184 CV)', 'xDrive30i (245/252 CV)', 'M40i B58 (354/360 CV)', 'xDrive20d (190 CV)', 'xDrive30d (265/286 CV)', 'M40d (326/340 CV)', 'xDrive30e PHEV (292 CV)', 'X3 M Competition (510 CV)'],
  
  // Electrificados BMW i
  'I01': ['i3 60 Ah (170 CV)', 'i3 94 Ah (170 CV)', 'i3 120 Ah (170 CV)', 'i3s 120 Ah (184 CV)', 'i3 REx Rango Extendido'],
  'I12': ['i8 Coupé Híbrido (362/374 CV)', 'i8 Roadster Híbrido (374 CV)']
};
