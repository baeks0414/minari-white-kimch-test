"""청도군 농기계임대사업소 CSV(전국농기계임대정보표준데이터 형식) → seed/machinery-cheongdo.json

사용: python3 tools/machinery_csv_to_json.py seed/raw/cheongdo-machinery-rental-20260903.csv seed/machinery-cheongdo.json
표준 칸(트랙터·경운기 등)과 '기타임대농기계보유정보'의 "이름(대수)+..."를 한 목록으로 합친다. 0대는 뺀다.
"""
import csv
import json
import re
import sys

STD = {  # CSV 칸 이름 → 앱에서 쓰는 기종 이름
    '트랙터및작업기보유대수': '트랙터(작업기 포함)',
    '경운기및작업기보유대수': '경운기(작업기 포함)',
    '관리기및작업기보유대수': '관리기(작업기 포함)',
    '땅속작물수확기보유대수': '땅속작물수확기',
    '탈곡기및정선작업기보유대수': '탈곡기·정선기',
    '자주형파종기보유대수': '자주형파종기',
    '이앙작업기보유대수': '이앙기',
    '벼수확및운반작업기보유대수': '벼 수확·운반기',
}
ETC = re.compile(r'([^+()]+)\((\d+)\)')


def convert(src):
    with open(src, encoding='utf-8-sig', newline='') as f:
        rows = [r for r in csv.DictReader(f) if r.get('사업소명')]
    offices, date = [], ''
    for i, r in enumerate(rows):
        machines = {name: int(r[col] or 0) for col, name in STD.items()}
        for name, n in ETC.findall(r.get('기타임대농기계보유정보', '')):
            machines[name.strip()] = machines.get(name.strip(), 0) + int(n)
        machines = {k: v for k, v in machines.items() if v > 0}
        name = r['사업소명'].replace('농기계임대사업소', '').strip() or r['사업소명']
        offices.append({
            'id': f'o{i + 1}',
            'name': name,
            'fullName': '청도군 농기계임대사업소 ' + name,
            'tel': r['사업소전화번호'].strip(),
            'road': r['소재지도로명주소'].strip(),
            'jibun': r['소재지지번주소'].strip(),
            'lat': float(r['위도']), 'lon': float(r['경도']),
            'machines': machines,
        })
        date = r.get('데이터기준일자', date).strip()
    kinds = sorted({k for o in offices for k in o['machines']})
    return {
        '_note': '청도군청 제공 농기계임대사업소 현황(공공데이터, 전국농기계임대정보표준데이터 형식). 보유 대수이며 실시간 대여 가능 대수가 아님.',
        'baseDate': date,
        'manager': {'name': rows[0]['관리기관명'].strip(), 'tel': rows[0]['관리기관전화번호'].strip()},
        'source': {'title': '전국농기계임대정보표준데이터 (공공데이터포털)', 'url': 'https://www.data.go.kr/data/15017325/standard.do'},
        'totals': {'offices': len(offices), 'kinds': len(kinds), 'units': sum(sum(o['machines'].values()) for o in offices)},
        'offices': offices,
    }


if __name__ == '__main__':
    out = convert(sys.argv[1])
    with open(sys.argv[2], 'w', encoding='utf-8') as f:
        json.dump(out, f, ensure_ascii=False, indent=1)
        f.write('\n')
    print(out['totals'], out['baseDate'])
