#!/usr/bin/env node

/**
 * Playwright Test Auto-Fix Script
 * 분석된 에러를 기반으로 테스트 자동 수정
 */

const fs = require('fs');
const path = require('path');

// 에러 유형별 수정 전략
const FIX_STRATEGIES = {
    'ERR_NAME_NOT_RESOLVED': {
        fix: 'URL 확인 및 networkidle 추가',
        action: 'add-wait-network'
    },
    'Timeout': {
        fix: '타임아웃 증가',
        action: 'increase-timeout'
    },
    'not be visible': {
        fix: '대기 시간 추가 또는 선택자 수정',
        action: 'add-wait-selector'
    },
    'has been closed': {
        fix: '페이지 다시 열기',
        action: 'reopen-page'
    }
};

function analyzeError(errorLog) {
    for (const [errorType, strategy] of Object.entries(FIX_STRATEGIES)) {
        if (errorLog.includes(errorType)) {
            return strategy;
        }
    }
    return { fix: '수동 확인 필요', action: 'manual' };
}

function generateFix(testFile, strategy) {
    let content = fs.readFileSync(testFile, 'utf8');
    
    switch (strategy.action) {
        case 'add-wait-network':
            content = content.replace(
                /await page\.goto\(['"]([^'"]+)['"]\)/g,
                `await page.goto('$1', { waitUntil: 'networkidle', timeout: 30000 })`
            );
            break;
        
        case 'increase-timeout':
            content = content.replace(
                /timeout: (\d+)/g,
                (match, timeout) => `timeout: ${parseInt(timeout) * 2}`
            );
            break;
        
        case 'add-wait-selector':
            content = content.replace(
                /toBeVisible\(\)/g,
                `toBeVisible({ timeout: 10000 })`
            );
            break;
    }
    
    return content;
}

// Main
async function main() {
    const testDir = path.join(__dirname, '..', 'tests');
    const testFiles = fs.readdirSync(testDir).filter(f => f.endsWith('.spec.ts'));
    
    console.log('🔍 Playwright 테스트 자동 수정 시작...\n');
    
    for (const file of testFiles) {
        const filePath = path.join(testDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        // 간단한 휴리스틱으로 수정 적용
        const fixed = generateFix(filePath, { action: 'add-wait-network' });
        
        if (fixed !== content) {
            fs.writeFileSync(filePath, fixed);
            console.log(`✅ ${file} 수정됨`);
        } else {
            console.log(`⏭️  ${file} 수정 사항 없음`);
        }
    }
    
    console.log('\n✨ 자동 수정 완료!');
}

main().catch(console.error);
