// 날씨 기준 지역. 서비스 대상인 경북 청도군(군청 부근)의 실시간 예보를 쓴다.
// 나중에 농가 위치별 예보로 바꿀 때 이 파일과 api/planner.py의 REGION만 고치면 된다.
export const REGION = {
  id: 'cheongdo',
  name: '경북 청도군',
  short: '청도',
  lat: 35.6475, lon: 128.7339, // 청도군청 부근
  why: '서비스 대상 지역 (청도 바이브코딩 해커톤 과제 지역)',
};
