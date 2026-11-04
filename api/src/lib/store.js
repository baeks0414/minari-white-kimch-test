// 메모리 저장소: seed/quest.json을 읽어요. (당일엔 Cosmos DB로 바꿀 자리)
const seed = require('../data/quest.json');

function listRegions() {
  return seed.regions.map(({ id, name, status }) => ({
    id,
    name,
    status,
    placeCount: seed.places.filter((p) => p.regionId === id).length,
  }));
}

function listPlaces(regionId) {
  return seed.places
    .filter((p) => !regionId || p.regionId === regionId)
    .map(({ id, regionId: rid, name, description }) => ({ id, regionId: rid, name, description }));
}

function listProducts() {
  return seed.products.map(({ id, name, category, pricePoint, stock, pickup, season, unlock }) => ({
    id, name, category, pricePoint, stock, pickup, season, unlock,
  }));
}

module.exports = { listRegions, listPlaces, listProducts };
