/**
 * Mapeo de motorizaciones icónicas por chasis emblemáticos de BMW
 * Para que búsquedas como "320i E46", "330ci", "325i E30", "135i E82", "530d E39", "M140i F20" 
 * tengan correspondencia directa y precisa en el buscador y el calculador.
 */
export const POPULAR_ENGINES_MAP: Record<string, string[]> = {
  'E30': ['316i', '318i', '318is', '320i', '323i', '325i', '325ix', '324d', '324td'],
  'E36': ['316i', '318i', '318is', '320i', '323i', '325i', '328i', '318tds', '325td', '325tds'],
  'E46': ['316i', '318i', '318ci', '320i', '320ci', '323i', '325i', '325ci', '328i', '328ci', '330i', '330ci', '318d', '320d', '320cd', '330d', '330cd'],
  'E90': ['316i', '318i', '320i', '320si', '325i', '330i', '335i', '316d', '318d', '320d', '325d', '330d', '335d'],
  'E92': ['320i', '325i', '330i', '335i', '320d', '330d', '335d'],
  'F30': ['316i', '318i', '320i', '328i', '330i', '335i', '340i', '316d', '318d', '320d', '325d', '330d', '335d', 'ActiveHybrid 3', '330e'],
  'G20': ['318i', '320i', '330i', 'M340i', '318d', '320d', '330d', 'M340d', '320e', '330e'],
  'F20': ['114i', '116i', '118i', '120i', '125i', 'M135i', 'M140i', '114d', '116d', '118d', '120d', '125d'],
  'E87': ['116i', '118i', '120i', '130i', '116d', '118d', '120d', '123d'],
  'E82': ['120i', '125i', '128i', '135i', '118d', '120d', '123d'],
  'E39': ['520i', '523i', '525i', '528i', '530i', '535i', '540i', '520d', '525td', '525tds', '525d', '530d'],
  'E60': ['520i', '523i', '525i', '530i', '540i', '545i', '550i', '520d', '525d', '530d', '535d'],
  'F10': ['520i', '528i', '530i', '535i', '550i', '518d', '520d', '525d', '530d', '535d', 'M550d'],
  'G30': ['520i', '530i', '540i', 'M550i', '520d', '525d', '530d', '540d', 'M550d', '530e'],
  'E53': ['3.0i', '4.4i', '4.6is', '4.8is', '3.0d'],
  'E70': ['3.0si', 'xDrive30i', '4.8i', 'xDrive48i', 'xDrive50i', '3.0d', 'xDrive30d', '3.0sd', 'xDrive35d', 'xDrive40d', 'M50d'],
  'F15': ['sDrive25d', 'xDrive25d', 'xDrive30d', 'xDrive40d', 'M50d', 'sDrive35i', 'xDrive35i', 'xDrive50i', 'xDrive40e'],
  'G05': ['sDrive40i', 'xDrive40i', 'xDrive50i', 'M50i', 'M60i', 'xDrive25d', 'xDrive30d', 'xDrive40d', 'M50d', 'xDrive45e', 'xDrive50e'],
  'E85': ['2.0i', '2.2i', '2.5i', '2.5si', '3.0i', '3.0si'],
  'E86': ['3.0si'],
  'E89': ['sDrive18i', 'sDrive20i', 'sDrive23i', 'sDrive28i', 'sDrive30i', 'sDrive35i', 'sDrive35is'],
  'G29': ['sDrive20i', 'sDrive30i', 'M40i']
};
