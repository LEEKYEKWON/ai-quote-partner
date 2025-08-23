// DOM 요소들
const quoteForm = document.getElementById('quoteForm');
const quoteResult = document.getElementById('quoteResult');
const quoteContent = document.getElementById('quoteContent');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');

// 현재 단계 관리
let currentStep = 1;
const totalSteps = 5;

// 견적 가격 기준 (템플릿 기반 제작, 현실적 가격)
const PRICE_BASE = {
    // 업종별 기본 가격 (기존 대비 30% 감소)
    industry: {
        'ecommerce': 1050000,      // 쇼핑몰 (150만원 → 105만원)
        'accommodation': 840000,   // 숙박업 (120만원 → 84만원)
        'medical': 700000,         // 의료 (100만원 → 70만원)
        'education': 560000,       // 교육 (80만원 → 56만원)
        'food': 420000,            // F&B (60만원 → 42만원)
        'corporate': 560000,       // 기업 (80만원 → 56만원)
        'portfolio': 350000,       // 포트폴리오 (50만원 → 35만원)
        'other': 490000            // 기타 (70만원 → 49만원)
    },
    
    // 목적별 가중치
    purpose: {
        'sales': 1.5,              // 판매/결제
        'booking': 1.3,            // 예약
        'promotion': 1.0,          // 홍보/정보
        'inquiry': 1.1             // 문의
    },
    
    // 페이지별 가격 (기존 대비 30% 감소)
    pages: {
        'intro': 70000,            // 회사 소개 (10만원 → 7만원)
        'products': 105000,        // 제품 소개 (15만원 → 10.5만원)
        'gallery': 84000,          // 갤러리 (12만원 → 8.4만원)
        'location': 56000,         // 오시는 길 (8만원 → 5.6만원)
        'news': 70000,             // 공지사항 (10만원 → 7만원)
        'faq': 56000,              // FAQ (8만원 → 5.6만원)
        'contact': 42000            // 문의하기 (6만원 → 4.2만원)
    },
    
    // 기능별 가격 (기존 대비 30% 감소)
    features: {
        'board': 140000,           // 게시판 (20만원 → 14만원)
        'booking': 210000,         // 예약 (30만원 → 21만원)
        'ecommerce': 350000,       // 쇼핑몰 (50만원 → 35만원)
        'membership': 175000,      // 회원가입 (25만원 → 17.5만원)
        'blog': 126000,            // 블로그 (18만원 → 12.6만원)
        'multilingual': 210000,    // 다국어 (30만원 → 21만원)
        'chat': 105000,            // 채팅 (15만원 → 10.5만원)
        'responsive': 70000,       // 반응형 (10만원 → 7만원)
        'seo': 105000,             // SEO (15만원 → 10.5만원)
        'admin': 140000,           // 관리자 (20만원 → 14만원)
        'analytics': 56000         // 분석 (8만원 → 5.6만원)
    }
};

// 전역 이름 매핑 (여러 함수에서 공통 사용)
const INDUSTRY_NAMES = {
    'ecommerce': '쇼핑몰/상점',
    'accommodation': '펜션/숙박업',
    'medical': '병원/의료',
    'education': '학원/교육',
    'food': 'F&B (식당/카페)',
    'corporate': '기업/브랜드 소개',
    'portfolio': '개인 포트폴리오',
    'other': '기타'
};
const PURPOSE_NAMES = {
    'sales': '제품/서비스 판매 및 결제',
    'booking': '예약 접수',
    'promotion': '회사/브랜드/개인 홍보 및 정보 제공',
    'inquiry': '고객 문의 접수 및 상담 연결'
};
const FEATURE_NAMES = {
    'board': '게시판 기능',
    'booking': '예약 기능',
    'ecommerce': '쇼핑몰/결제 기능',
    'membership': '회원가입/로그인 기능',
    'blog': '블로그/콘텐츠 발행 기능',
    'multilingual': '다국어 지원',
    'chat': '채팅 상담 기능',
    'responsive': '반응형 디자인',
    'seo': 'SEO 최적화',
    'admin': '관리자 페이지',
    'analytics': '방문자 분석'
};
const TIMELINE_NAMES = {
    'urgent': '급함 (2주 이내)',
    'normal': '보통 (1-2개월)',
    'flexible': '여유있음 (3개월 이상)'
};
const BUDGET_NAMES = {
    'low': '50만원 미만',
    'medium': '50만원 - 200만원',
    'high': '200만원 - 500만원',
    'premium': '500만원 이상'
};
const PAGE_NAMES = {
    'intro': '회사/브랜드 소개',
    'products': '제품/서비스 소개',
    'gallery': '갤러리/포트폴리오',
    'location': '오시는 길 (지도)',
    'news': '공지사항/뉴스',
    'faq': '자주 묻는 질문 (FAQ)',
    'contact': '문의하기 (간단한 입력폼)'
};
const DESIGN_STYLE_NAMES = {
    'modern': '모던하고 심플한',
    'warm': '따뜻하고 감성적인',
    'professional': '전문적이고 신뢰감 있는',
    'creative': '화려하고 개성있는'
};
const COLOR_TONE_NAMES = {
    'bright': '밝은 톤',
    'dark': '어두운 톤',
    'brand': '특정 브랜드 컬러 사용',
    'neutral': '중성색 계열'
};
const LOGO_STATUS_NAMES = {
    'ready': '네, 가지고 있습니다',
    'need': '아니요, 새로 만들어야 합니다'
};
const CONTENT_STATUS_NAMES = {
    'ready': '네, 직접 제공할 수 있습니다',
    'need': '아니요, 전문가의 도움이 필요합니다'
};
const ADMIN_NEEDS_NAMES = {
    'yes': '네, 직접 수정할 수 있는 관리자 페이지가 필요합니다',
    'no': '아니요, 수정할 때마다 전문가에게 요청하겠습니다'
};

// 견적 등급 한글 변환
const QUOTE_GRADE_NAMES = {
    'lowest': '최저가형',
    'basic': '실속형',
    'premium': '프리미엄'
};

// 단계별 진행 관리
function showStep(step) {
    console.log('showStep called with step:', step); // 디버깅용
    
    // 폼 섹션만 선택하여 단계별 진행 관리
    document.querySelectorAll('.form-section.step-section').forEach(section => {
        section.classList.remove('active', 'completed');
        console.log('Removing active/completed from form section:', section); // 디버깅용
    });
    
    // 현재 단계의 폼 섹션 활성화
    const currentSection = document.querySelector(`.form-section.step-section[data-step="${step}"]`);
    if (currentSection) {
        currentSection.classList.add('active');
        console.log('Added active to form section:', currentSection); // 디버깅용
        
        // STEP2부터는 헤더 숨기기, STEP1에서는 헤더 표시
        const header = document.querySelector('.header');
        if (header) {
            if (step === 1) {
                header.style.display = 'block';
            } else {
                header.style.display = 'none';
            }
        }
        
        // 모든 화면 크기에서 스크롤 제어
        if (step === 1) {
            // STEP1: 진행상황 섹션부터 보이도록 스크롤 (헤더 높이만큼 여백 추가)
            const welcomeSection = document.getElementById('welcomeSection');
            if (welcomeSection) {
                welcomeSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
                
                // 헤더 높이만큼 추가 스크롤 (헤더에 가려지지 않도록)
                setTimeout(() => {
                    window.scrollBy(0, -80); // 헤더 높이만큼 위로
                }, 500);
            }
        } else {
            // STEP2~5: 진행상황 섹션부터 보이도록 스크롤 (모든 화면 크기)
            const welcomeSection = document.getElementById('welcomeSection');
            if (welcomeSection) {
                welcomeSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        }
    } else {
        console.error('Form section not found for step:', step); // 디버깅용
    }
    
    // 이전 단계들 완료 표시
    for (let i = 1; i < step; i++) {
        const prevSection = document.querySelector(`.form-section.step-section[data-step="${i}"]`);
        if (prevSection) {
            prevSection.classList.add('completed');
        }
    }
    
    // 진행 바 업데이트
    updateProgressBar(step);
    
    // 버튼 상태 업데이트
    updateNavigationButtons(step);
}

function updateProgressBar(step) {
    document.querySelectorAll('.progress-step').forEach((progressStep, index) => {
        const stepNumber = index + 1;
        progressStep.classList.remove('active', 'completed');
        
        if (stepNumber === step) {
            progressStep.classList.add('active');
        } else if (stepNumber < step) {
            progressStep.classList.add('completed');
        }
    });
}

function updateNavigationButtons(step) {
    prevBtn.style.display = step > 1 ? 'block' : 'none';
    nextBtn.style.display = step < totalSteps ? 'block' : 'none';
    submitBtn.style.display = step === totalSteps ? 'block' : 'none';
    
    prevBtn.disabled = step <= 1;
    nextBtn.disabled = step >= totalSteps;
}

function nextStep() {
    if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}

// AI 견적 생성 함수 (템플릿 기반 제작, 단순화된 계산)
function generateAIQuote(formData) {
    let basePrice = PRICE_BASE.industry[formData.industry] || 490000;
    // 목적별 가중치 적용
    basePrice *= PRICE_BASE.purpose[formData.mainPurpose] || 1.0;
    // 페이지별 가격 추가
    if (formData.pages) {
        formData.pages.forEach(page => {
            basePrice += PRICE_BASE.pages[page] || 0;
        });
    }
    // 추가 기능 가격
    if (formData.features) {
        formData.features.forEach(feature => {
            basePrice += PRICE_BASE.features[feature] || 0;
        });
    }
    // 최종 가격을 10만원 단위로 반올림
    const finalPrice = Math.round(basePrice / 100000) * 100000;
    // 실속형: 30% 할인
    const basicPrice = Math.round((finalPrice * 0.7) / 10000) * 10000;
    const lowestPrice = Math.round((basicPrice * 0.7) / 10000) * 10000;
    return {
        premium: {
            price: finalPrice,
            breakdown: {
                basePrice: PRICE_BASE.industry[formData.industry] || 490000,
                purpose: PRICE_BASE.purpose[formData.mainPurpose] || 1.0,
                pages: formData.pages || [],
                features: formData.features || []
            }
        },
        basic: {
            price: basicPrice,
            breakdown: {
                basePrice: PRICE_BASE.industry[formData.industry] || 490000,
                purpose: PRICE_BASE.purpose[formData.mainPurpose] || 1.0,
                pages: formData.pages || [],
                features: formData.features || []
            }
        },
        lowest: {
            price: lowestPrice,
            breakdown: {
                basePrice: PRICE_BASE.industry[formData.industry] || 490000,
                purpose: PRICE_BASE.purpose[formData.mainPurpose] || 1.0,
                pages: formData.pages || [],
                features: formData.features || []
            }
        }
    };
}

// 견적 결과를 HTML로 렌더링
function renderQuote(quote, formData) {
    const industryNames = {
        'ecommerce': '쇼핑몰/상점',
        'accommodation': '펜션/숙박업',
        'medical': '병원/의료',
        'education': '학원/교육',
        'food': 'F&B (식당/카페)',
        'corporate': '기업/브랜드 소개',
        'portfolio': '개인 포트폴리오',
        'other': '기타'
    };
    const purposeNames = {
        'sales': '제품/서비스 판매 및 결제',
        'booking': '예약 접수',
        'promotion': '회사/브랜드/개인 홍보 및 정보 제공',
        'inquiry': '고객 문의 접수 및 상담 연결'
    };
    const featureNames = {
        'board': '게시판 기능',
        'booking': '예약 기능',
        'ecommerce': '쇼핑몰/결제 기능',
        'membership': '회원가입/로그인 기능',
        'blog': '블로그/콘텐츠 발행 기능',
        'multilingual': '다국어 지원',
        'chat': '채팅 상담 기능',
        'responsive': '반응형 디자인',
        'seo': 'SEO 최적화',
        'admin': '관리자 페이지',
        'analytics': '방문자 분석'
    };
    // 최저가형 조건 판별
    const showLowest = getLowestTypeEligibility(formData);
    const lowestUnmet = getLowestTypeUnmetReasons(formData);
    quoteContent.innerHTML = `
        <div class="quote-summary">
            <div class="quote-price" style="margin-bottom:2rem;">
                <table style="width:100%;border:1px solid #ccc;border-collapse:collapse;text-align:center;">
                    <thead>
                        <tr style="background:#e6e6fa;">
                            ${showLowest ? '<th style="padding:0.9em 0.5em;color:#333;font-weight:700;border:1px solid #ccc;">최저가형</th>' : ''}
                            <th style="padding:0.9em 0.5em;color:#333;font-weight:700;border:1px solid #ccc;">실속형</th>
                            <th style="padding:0.9em 0.5em;color:#333;font-weight:700;border:1px solid #ccc;">프리미엄</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            ${showLowest ? `<td style="font-size:1.5rem;font-weight:700;color:#222;background:#fff;border:1px solid #ccc;padding:1em 0;">${quote.lowest.price.toLocaleString()}원</td>` : ''}
                            <td style="font-size:1.5rem;font-weight:700;color:#222;background:#fff;border:1px solid #ccc;padding:1em 0;">${quote.basic.price.toLocaleString()}원</td>
                            <td style="font-size:1.5rem;font-weight:700;color:#222;background:#fff;border:1px solid #ccc;padding:1em 0;">${quote.premium.price.toLocaleString()}원</td>
                        </tr>
                        <tr>
                            ${showLowest ? '<td style="font-size:0.95rem;color:#222;background:#fff;border:1px solid #ccc;text-align:center;padding:1em 0;vertical-align:middle;"><span>* 필수 기능만 선택 시,<br>최저가 제공</span></td>' : ''}
                            <td style="font-size:0.95rem;color:#222;background:#fff;border:1px solid #ccc;text-align:center;padding:1em 0;vertical-align:middle;"><span>* 깔끔한 기본 디자인,<br>필수 기능 중심</span></td>
                            <td style="font-size:0.95rem;color:#222;background:#fff;border:1px solid #ccc;text-align:center;padding:1em 0;vertical-align:middle;"><span>* 맞춤형 디자인, 기능 포함,<br>상세 상담 필요</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div style="margin-top: 1rem; text-align: center;">
                <p style="font-weight: 600; color: #333; margin-bottom: 0.8rem;">희망하는 등급을 선택해주세요:</p>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    ${showLowest ? `
                    <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer; padding: 0.5rem; border-radius: 6px; transition: background-color 0.2s ease;">
                        <input type="checkbox" name="selectedQuote" value="lowest" id="lowestCheckbox" style="width: auto; margin: 0;">
                        <span>최저가형</span>
                    </label>
                    ` : ''}
                    <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer; padding: 0.5rem; border-radius: 6px; transition: background-color 0.2s ease;">
                        <input type="checkbox" name="selectedQuote" value="basic" id="basicCheckbox" style="width: auto; margin: 0;">
                        <span>실속형</span>
                    </label>
                    <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer; padding: 0.5rem; border-radius: 6px; transition: background-color 0.2s ease;">
                        <input type="checkbox" name="selectedQuote" value="premium" id="premiumCheckbox" style="width: auto; margin: 0;">
                        <span>프리미엄</span>
                    </label>
                </div>
            </div>
            ${(!showLowest && lowestUnmet.length > 0) ? `<div style="background:#f8d7da;color:#721c24;padding:1rem;border-radius:8px;margin-bottom:1.5rem;font-size:1rem;line-height:1.7;">
                <strong>최저가형 견적을 원하시나요?</strong><br>
                ${(() => {
                    if (lowestUnmet.length === 1) {
                        // 마지막 조건만 남은 경우
                        return lowestUnmet[0].replace(/선택하시면/, '선택').replace(/선택 해제하시면/, '선택 해제') + '하시면 더욱 저렴한 최저가형 견적을 받을 수 있습니다.';
                    } else {
                        // 여러 조건일 때 쉼표로 연결, 마지막만 안내문
                        return lowestUnmet.map((r, i) =>
                            i === lowestUnmet.length - 1
                                ? r.replace(/선택하시면/, '선택').replace(/선택 해제하시면/, '선택 해제') + '하시면 더욱 저렴한 최저가형 견적을 받을 수 있습니다.'
                                : r.replace(/선택하시면/, '선택').replace(/선택 해제하시면/, '선택 해제') + ','
                        ).join('<br>');
                    }
                })()}
            </div>` : ''}
            <div class="quote-details">
                <h4>견적 상세 내역</h4>
                <div class="detail-item">
                    <strong>업종:</strong> ${INDUSTRY_NAMES[formData.industry]}
                </div>
                <div class="detail-item">
                    <strong>주요 목적:</strong> ${PURPOSE_NAMES[formData.mainPurpose]}
                </div>
                <div class="detail-item">
                    <strong>페이지 구성:</strong> ${formData.pageCount ? formData.pageCount + ' (선택된 페이지: ' + (formData.pages ? formData.pages.length : 0) + '개)' : '선택된 페이지: ' + (formData.pages ? formData.pages.length : 0) + '개'}
                </div>
                <div class="detail-item">
                    <strong>추가 기능:</strong> ${formData.features && formData.features.length > 0 ? formData.features.map(f => FEATURE_NAMES[f]).join(', ') : '없음'}
                </div>
                <div class="detail-item">
                    <strong>완성 희망 일정:</strong> ${TIMELINE_NAMES[formData.timeline] || ''}
                </div>
                <div class="detail-item">
                    <strong>예산 범위:</strong> ${BUDGET_NAMES[formData.budget] || ''}
                </div>
            </div>
            <div class="quote-next-steps">
                <h4>다음 단계</h4>
                <ol>
                    <li>추천 개발자와 상담 진행</li>
                    <li>상세 요구사항 협의 및 계약</li>
                    <li>개발 진행 및 완성</li>
                </ol>
            </div>
        </div>
    `;
}

// AI 추천사항 생성 (업종별 맞춤)
function generateRecommendations(formData, quote) {
    const recommendations = [];
    
    // 업종별 추천
    switch (formData.industry) {
        case 'ecommerce':
            recommendations.push('쇼핑몰은 보안과 결제 시스템을 중점적으로 검토하세요');
            recommendations.push('모바일 최적화로 매출을 크게 향상시킬 수 있습니다');
            break;
        case 'accommodation':
            recommendations.push('예약 시스템과 결제 연동이 핵심입니다');
            recommendations.push('객실 사진과 상세 정보로 예약률을 높이세요');
            break;
        case 'medical':
            recommendations.push('의료진 소개와 예약 시스템을 중점적으로 구성하세요');
            recommendations.push('진료 시간과 오시는 길 정보를 명확하게 표시하세요');
            break;
        case 'food':
            recommendations.push('메뉴 사진과 예약 시스템으로 방문객을 유도하세요');
            recommendations.push('위치 기반 서비스와 연동하면 효과적입니다');
            break;
    }
    
    // 기능별 추천
    if (formData.features && formData.features.includes('ecommerce')) {
        recommendations.push('PG사 연동으로 안전한 결제 시스템을 구축하세요');
    }
    
    if (formData.features && formData.features.includes('booking')) {
        recommendations.push('예약 시스템은 실시간 업데이트가 중요합니다');
    }
    
    if (formData.features && formData.features.includes('responsive')) {
        recommendations.push('모바일 최적화로 사용자 경험이 크게 향상됩니다');
    }
    

    
    // 기본 추천사항
    if (recommendations.length === 0) {
        recommendations.push('현재 요구사항에 적합한 개발사와 상담을 진행하세요');
    }
    
    return recommendations.map(rec => `<li>${rec}</li>`).join('');
}

// 폼 데이터 수집
function collectFormData() {
    const formData = new FormData(quoteForm);
    const data = {};
    
    // 기본 필드들
    data.businessName = formData.get('businessName');
    data.contactName = formData.get('contactName');
    data.email = formData.get('email');
    data.phone = formData.get('phone');
    data.industry = formData.get('industry');
    data.mainPurpose = formData.get('mainPurpose');
    data.referenceSites = formData.get('referenceSites');
    data.colorTone = formData.get('colorTone');
    data.brandColor = formData.get('brandColor');
    data.logoStatus = formData.get('logoStatus');
    data.contentStatus = formData.get('contentStatus');
    data.adminNeeds = formData.get('adminNeeds');
    data.timeline = formData.get('timeline');
    data.budget = formData.get('budget');
    data.additionalInfo = formData.get('additionalInfo');
    data.pageCount = formData.get('pageCount');
    data.customPages = formData.get('customPages');
    
    // 체크박스 그룹들
    data.designStyle = formData.getAll('designStyle');
    data.pages = formData.getAll('pages');
    data.features = formData.getAll('features');
    
    return data;
}

// 폼 유효성 검사
function validateCurrentStep() {
    const currentSection = document.querySelector(`.form-section.step-section[data-step="${currentStep}"]`);
    const requiredFields = currentSection.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#dc3545';
            isValid = false;
        } else {
            field.style.borderColor = '#e1e5e9';
        }
    });
    
    // 체크박스 그룹 검증
    const checkboxGroups = currentSection.querySelectorAll('.checkbox-group');
    checkboxGroups.forEach(group => {
        const checkboxes = group.querySelectorAll('input[type="checkbox"]');
        const checkedBoxes = group.querySelectorAll('input[type="checkbox"]:checked');
        
        if (checkboxes.length > 0 && checkedBoxes.length === 0) {
            checkboxes.forEach(cb => cb.style.borderColor = '#dc3545');
            isValid = false;
        } else {
            checkboxes.forEach(cb => cb.style.borderColor = '#e1e5e9');
        }
    });
    
    return isValid;
}

// 최저가형 조건 판별 함수 (수정됨)
function getLowestTypeEligibility(formData) {
    console.log('=== 최저가형 조건 체크 시작 ===');
    console.log('formData:', formData);
    
    // 주요 목적 체크
    if (formData.mainPurpose !== 'promotion') {
        console.log('❌ 주요 목적 조건 불만족:', formData.mainPurpose, '(promotion이어야 함)');
        return false;
    }
    console.log('✅ 주요 목적 조건 만족');
    
    // 예상 페이지 수 체크
    if (!(formData.pageCount === '1-5' || formData.pageCount === '6-10')) {
        console.log('❌ 페이지 수 조건 불만족:', formData.pageCount, '(1-5 또는 6-10이어야 함)');
        return false;
    }
    console.log('✅ 페이지 수 조건 만족');
    
    // 추가 기능 체크 (board, responsive, seo는 허용, 나머지 8개는 금지)
    const forbiddenFeatures = ['booking','ecommerce','membership','blog','multilingual','chat','admin','analytics'];
    console.log('선택된 기능들:', formData.features);
    console.log('금지된 기능들:', forbiddenFeatures);
    
    if (formData.features && formData.features.length > 0) {
        const selectedProhibited = formData.features.filter(f => forbiddenFeatures.includes(f));
        if (selectedProhibited.length > 0) {
            console.log('❌ 금지된 기능 선택됨:', selectedProhibited);
            return false;
        }
    }
    console.log('✅ 추가 기능 조건 만족');
    
    // 관리자 기능 필요 여부 체크
    if (formData.adminNeeds !== 'no') {
        console.log('❌ 관리자 기능 조건 불만족:', formData.adminNeeds, '(no이어야 함)');
        return false;
    }
    console.log('✅ 관리자 기능 조건 만족');
    
    console.log('🎉 최저가형 조건 모두 만족!');
    return true;
}
// 미충족 조건 안내 함수
function getLowestTypeUnmetReasons(formData) {
    const reasons = [];
    if (formData.mainPurpose !== 'promotion') return reasons; // 안내 필요 없음
    if (!(formData.pageCount === '1-5' || formData.pageCount === '6-10')) {
        reasons.push('STEP3의 예상 페이지 수를 1-5페이지 또는 6-10페이지로 선택하시면');
    }
    const forbiddenFeatures = [
        {key:'booking',label:'예약 기능'},
        {key:'ecommerce',label:'쇼핑몰/결제 기능'},
        {key:'membership',label:'회원가입/로그인기능'},
        {key:'blog',label:'블로그/콘텐츠 발행 기능'},
        {key:'multilingual',label:'다국어 지원'},
        {key:'chat',label:'채팅 상담 기능'},
        {key:'admin',label:'관리자 페이지'},
        {key:'analytics',label:'방문자 분석'}
    ];
    if (formData.features) {
        const selected = forbiddenFeatures.filter(f => formData.features.includes(f.key));
        if (selected.length > 0) {
            reasons.push('STEP4의 추가하고 싶은 기능에서 ' + selected.map(f=>f.label).join(', ') + '을(를) 선택 해제하시면');
        }
    }
    if (formData.adminNeeds !== 'no') {
        reasons.push('STEP5의 관리자 기능 필요 여부에서 "아니요, 수정할 때마다 전문가에게 요청하겠습니다."를 선택하시면');
    }
    return reasons;
}

// 이벤트 리스너
nextBtn.addEventListener('click', function() {
    if (validateCurrentStep()) {
        nextStep();
    } else {
        alert('필수 항목을 모두 입력해주세요.');
    }
});

prevBtn.addEventListener('click', function() {
    prevStep();
});

// 폼 제출 처리
quoteForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateCurrentStep()) {
        // 로딩 상태 표시
        const loadingState = document.getElementById('loadingState');
        const quoteForm = document.getElementById('quoteForm');
        
        if (loadingState && quoteForm) {
            loadingState.style.display = 'block';
            quoteForm.style.display = 'none';
            
            // 견적 계산 시뮬레이션 (실제로는 즉시 계산되지만 사용자 경험을 위해)
            setTimeout(() => {
                const formData = collectFormData();
                
                // AI 견적 생성
                const quote = generateAIQuote(formData);
                
                // 로딩 상태 숨기기
                loadingState.style.display = 'none';
                quoteForm.style.display = 'block';
                
                // 결과 표시
                renderQuote(quote, formData);
                quoteResult.style.display = 'block';
                
                // 견적 결과 버튼들 이벤트 바인딩
                bindQuoteResultButtons(formData, quote);
                
                // 결과로 스크롤
                quoteResult.scrollIntoView({ behavior: 'smooth' });
            }, 2000); // 2초 로딩 표시
        }
    } else {
        alert('필수 항목을 모두 입력해주세요.');
    }
});

// 견적서 저장 버튼은 현재 UI에서 제거됨. 안전을 위해 존재할 때만 동작하도록 보호
if (typeof saveQuoteBtn !== 'undefined' && saveQuoteBtn) {
    saveQuoteBtn.addEventListener('click', function() {
        const formData = collectFormData();
        const quote = generateAIQuote(formData);
        
        const quoteData = {
            timestamp: new Date().toISOString(),
            formData: formData,
            quote: quote
        };
        
        // 로컬 스토리지에 저장
        const savedQuotes = JSON.parse(localStorage.getItem('savedQuotes') || '[]');
        savedQuotes.push(quoteData);
        localStorage.setItem('savedQuotes', JSON.stringify(savedQuotes));
        
        alert('견적서가 저장되었습니다!');
    });
}

// 개발자 연결: quote 결과 영역에서 새 방식으로 핸들링하므로 기본 리스너 제거(존재 시)
if (typeof contactDevelopersBtn !== 'undefined' && contactDevelopersBtn) {
    try {
        contactDevelopersBtn.replaceWith(contactDevelopersBtn.cloneNode(true));
    } catch (e) {
        // ignore
    }
}

// 견적 결과 페이지 버튼들 이벤트 바인딩 함수
function bindQuoteResultButtons(formData, quote) {
    console.log('버튼 이벤트 바인딩 시작');
    
    // 체크박스 초기화 및 최저가형 조건에 따른 표시/숨김
    const lowestCheckbox = document.getElementById('lowestCheckbox');
    const basicCheckbox = document.getElementById('basicCheckbox');
    const premiumCheckbox = document.getElementById('premiumCheckbox');
    const showLowest = getLowestTypeEligibility(formData);
    
    if (lowestCheckbox && basicCheckbox && premiumCheckbox) {
        // 최저가형 체크박스는 조건을 만족할 때만 표시
        if (lowestCheckbox.parentElement) {
            lowestCheckbox.parentElement.style.display = showLowest ? 'inline-flex' : 'none';
        }
        
        // 모든 체크박스 초기화
        lowestCheckbox.checked = false;
        basicCheckbox.checked = false;
        premiumCheckbox.checked = false;
    }
    
    // 개발자 연결하기 버튼 - 새로운 방식
    const contactBtn = document.getElementById('contactDevelopers');
    if (contactBtn) {
        console.log('개발자 연결하기 버튼 찾음');
        contactBtn.replaceWith(contactBtn.cloneNode(true)); // 기존 이벤트 완전 제거
        const newContactBtn = document.getElementById('contactDevelopers');
        newContactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('개발자 연결하기 버튼 클릭됨');
            
            // 체크박스 유효성 검사
            const selectedQuotes = document.querySelectorAll('input[name="selectedQuote"]:checked');
            if (selectedQuotes.length === 0) {
                alert('산출된 견적가 중 하나 이상을 선택해주세요.');
                return;
            }
            
            // 선택된 등급들을 배열로 수집
            const selectedQuoteValues = Array.from(selectedQuotes).map(cb => cb.value);
            
            showDeveloperConnectionModal(formData, quote, selectedQuoteValues);
        });
    } else {
        console.log('개발자 연결하기 버튼 못 찾음');
    }
    
    // 나에게 견적서 보내기 버튼 - 기존 방식 유지
    const sendBtn = document.getElementById('sendQuoteToMe');
    if (sendBtn) {
        console.log('나에게 견적서 보내기 버튼 찾음');
        sendBtn.replaceWith(sendBtn.cloneNode(true)); // 기존 이벤트 완전 제거
        const newSendBtn = document.getElementById('sendQuoteToMe');
        newSendBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('나에게 견적서 보내기 버튼 클릭됨');
            const showLowest = getLowestTypeEligibility(formData);
            const subject = `[AI 견적파트너] 홈페이지 견적서 - ${formData.businessName || ''}`;
            const body = `안녕하세요!\n\n[AI 견적파트너]에서 산출한 홈페이지 견적서입니다.\n\n회사/서비스명: ${formData.businessName || ''}\n담당자명: ${formData.contactName || ''}\n이메일: ${formData.email || ''}\n업종: ${INDUSTRY_NAMES[formData.industry] || ''}\n주요 목적: ${PURPOSE_NAMES[formData.mainPurpose] || ''}\n페이지 구성: ${formData.pageCount || ''} (선택된 페이지: ${(formData.pages ? formData.pages.length : 0)}개)\n추가 기능: ${(formData.features && formData.features.length > 0) ? formData.features.map(f => FEATURE_NAMES[f] || f).join(', ') : '없음'}\n완성 희망일: ${TIMELINE_NAMES[formData.timeline] || ''}\n예산: ${BUDGET_NAMES[formData.budget] || ''}\n\n예상 견적:\n${showLowest ? `최저가형: ${quote.lowest.price.toLocaleString()}원\n` : ''}실속형: ${quote.basic.price.toLocaleString()}원\n프리미엄: ${quote.premium.price.toLocaleString()}원\n\n감사합니다.`;
            const mailtoLink = `mailto:${formData.email || ''}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.open(mailtoLink);
        });
    } else {
        console.log('나에게 견적서 보내기 버튼 못 찾음');
    }
}

// 개발자 연결 모달 표시 함수
function showDeveloperConnectionModal(formData, quote, selectedQuotes) {
    // 모달 HTML 생성
    const modalHtml = `
        <div id="developerModal" style="position:fixed;z-index:10000;left:0;top:0;width:100vw;height:100vh;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;">
            <div style="background:#fff;max-width:700px;width:90vw;max-height:90vh;overflow-y:auto;padding:2rem;border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,0.2);">
                <h3 style="margin-bottom:1.5rem;text-align:center;color:#333;">개발자 연결 신청 내용 확인</h3>
                <div id="connectionDetails" style="background:#f8f9fa;padding:1.5rem;border-radius:8px;margin-bottom:1.5rem;font-size:0.95rem;line-height:1.7;"></div>
                <div style="text-align:center;margin-bottom:1.5rem;padding:1rem;background:#e6f3ff;border-radius:8px;">
                    <strong>상기 내용으로 개발자 연결 신청합니다.</strong>
                </div>
                <div style="display:flex;gap:1rem;justify-content:center;">
                    <button id="confirmConnection" style="background:#667eea;color:#fff;border:none;padding:0.8rem 2rem;border-radius:8px;font-size:1rem;cursor:pointer;">확인</button>
                    <button id="editQuote" style="background:#6c757d;color:#fff;border:none;padding:0.8rem 2rem;border-radius:8px;font-size:1rem;cursor:pointer;">견적 수정하기</button>
                    <button id="closeDeveloperModal" style="background:#dc3545;color:#fff;border:none;padding:0.8rem 2rem;border-radius:8px;font-size:1rem;cursor:pointer;">취소</button>
                </div>
            </div>
        </div>
    `;
    
    // 기존 모달 제거 후 새로 추가
    const existingModal = document.getElementById('developerModal');
    if (existingModal) existingModal.remove();
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // 상세 내용 렌더링
    const detailsDiv = document.getElementById('connectionDetails');
    const showLowest = getLowestTypeEligibility(formData);
    detailsDiv.innerHTML = `
        <div><strong>회사/서비스명:</strong> ${formData.businessName || ''}</div>
        <div><strong>담당자명:</strong> ${formData.contactName || ''}</div>
        <div><strong>이메일:</strong> ${formData.email || ''}</div>
        <div><strong>연락처:</strong> ${formData.phone || ''}</div>
        <div><strong>업종:</strong> ${INDUSTRY_NAMES[formData.industry] || ''}</div>
        <div><strong>주요 목적:</strong> ${PURPOSE_NAMES[formData.mainPurpose] || ''}</div>
        <div><strong>참고 사이트:</strong> ${formData.referenceSites || ''}</div>
        <div><strong>디자인 스타일:</strong> ${(formData.designStyle && formData.designStyle.length > 0) ? formData.designStyle.map(d => DESIGN_STYLE_NAMES[d] || d).join(', ') : ''}</div>
        <div><strong>색상 톤:</strong> ${COLOR_TONE_NAMES[formData.colorTone] || ''}</div>
        <div><strong>브랜드 컬러:</strong> ${formData.brandColor || ''}</div>
        <div><strong>로고 상태:</strong> ${LOGO_STATUS_NAMES[formData.logoStatus] || ''}</div>
        <div><strong>예상 페이지 수:</strong> ${formData.pageCount || ''}</div>
        <div><strong>선택한 페이지:</strong> ${(formData.pages && formData.pages.length > 0) ? formData.pages.map(p => PAGE_NAMES[p] || p).join(', ') : '없음'}</div>
        <div><strong>기타 페이지:</strong> ${formData.customPages || ''}</div>
        <div><strong>추가 기능:</strong> ${(formData.features && formData.features.length > 0) ? formData.features.map(f => FEATURE_NAMES[f] || f).join(', ') : '없음'}</div>
        <div><strong>콘텐츠 준비 상태:</strong> ${CONTENT_STATUS_NAMES[formData.contentStatus] || ''}</div>
        <div><strong>관리자 기능 필요 여부:</strong> ${ADMIN_NEEDS_NAMES[formData.adminNeeds] || ''}</div>
        <div><strong>완성 희망일:</strong> ${TIMELINE_NAMES[formData.timeline] || ''}</div>
        <div><strong>예산:</strong> ${BUDGET_NAMES[formData.budget] || ''}</div>
        <div><strong>추가 설명:</strong> ${formData.additionalInfo || '없음'}</div>
        <div style="margin-top:1rem;"><strong>예상 견적:</strong><br>
            ${showLowest ? `최저가형: ${quote.lowest.price.toLocaleString()}원<br>` : ''}
            실속형: ${quote.basic.price.toLocaleString()}원<br>
            프리미엄: ${quote.premium.price.toLocaleString()}원
        </div>
    `;
    
    // 버튼 이벤트 - setTimeout으로 DOM 생성 후 바인딩
    setTimeout(() => {
        const confirmBtn = document.getElementById('confirmConnection');
        const editBtn = document.getElementById('editQuote');
        const closeBtn = document.getElementById('closeDeveloperModal');
        
        if (confirmBtn) {
            confirmBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('확인 버튼 클릭됨');
                saveDeveloperConnection(formData, quote, selectedQuotes);
                const modal = document.getElementById('developerModal');
                if (modal) modal.remove();
                // 관리자에게 자동 이메일 발송
                sendAdminNotification(formData, quote, selectedQuotes);
                
                alert('개발자 연결 신청이 완료되었습니다.\n\n빠르면 1시간 이내, 늦어도 24시간 이내 연결된 개발자가 연락을 드릴 예정입니다.');
            });
        }
        
        if (editBtn) {
            editBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('견적 수정하기 버튼 클릭됨');
                const modal = document.getElementById('developerModal');
                if (modal) modal.remove();
                // 견적 결과 숨기고 폼으로 돌아가기
                const quoteResult = document.getElementById('quoteResult');
                if (quoteResult) quoteResult.style.display = 'none';
                const quoteForm = document.querySelector('.quote-form');
                if (quoteForm) quoteForm.scrollIntoView({ behavior: 'smooth' });
            });
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('취소 버튼 클릭됨');
                const modal = document.getElementById('developerModal');
                if (modal) modal.remove();
            });
        }
        
        // 모달 배경 클릭시 닫기
        const modal = document.getElementById('developerModal');
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        }
    }, 100);
}

// 브라우저 알림 권한 요청
function requestNotificationPermission() {
    if (Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

// 관리자에게 자동 이메일 발송
function sendAdminNotification(formData, quote, selectedQuotes) {
    // EmailJS 설정 (무료 계정 필요)
    emailjs.init("gLAhNlqPXdcS1EmTt"); // EmailJS에서 발급받은 Public Key 입력
    
    const templateParams = {
        to_email: 'hayabusak@naver.com', // 관리자 이메일
        to_name: '관리자',
        from_name: formData.businessName || '고객',
        customer_name: formData.businessName || '이름없음',
        contact_name: formData.contactName || '',
        phone: formData.phone || '',
        email: formData.email || '',
        industry: INDUSTRY_NAMES[formData.industry] || formData.industry,
        mainPurpose: PURPOSE_NAMES[formData.mainPurpose] || formData.mainPurpose,
        referenceSites: formData.referenceSites || '',
        pageCount: formData.pageCount || '',
        pages: formData.pages ? formData.pages.map(p => PAGE_NAMES[p] || p).join(', ') : '',
        features: formData.features ? formData.features.map(f => FEATURE_NAMES[f] || f).join(', ') : '',
        designStyle: DESIGN_STYLE_NAMES[formData.designStyle] || formData.designStyle,
        colorTone: COLOR_TONE_NAMES[formData.colorTone] || formData.colorTone,
        brandColor: formData.brandColor || '미선택',
        logoStatus: LOGO_STATUS_NAMES[formData.logoStatus] || formData.logoStatus,
        contentStatus: CONTENT_STATUS_NAMES[formData.contentStatus] || formData.contentStatus,
        adminNeeds: ADMIN_NEEDS_NAMES[formData.adminNeeds] || formData.adminNeeds,
        timeline: TIMELINE_NAMES[formData.timeline] || formData.timeline,
        budget: BUDGET_NAMES[formData.budget] || formData.budget,
        customPages: formData.customPages || '',
        additionalNotes: formData.additionalInfo || '',
        lowestPrice: quote.lowest ? quote.lowest.price.toLocaleString() + '원' : '해당없음',
        basicPrice: quote.basic.price.toLocaleString() + '원',
        premiumPrice: quote.premium.price.toLocaleString() + '원',
        selectedQuotes: selectedQuotes.map(q => QUOTE_GRADE_NAMES[q] || q).join(', '),
        timestamp: new Date().toLocaleString()
    };
    
    // EmailJS 템플릿 사용하여 이메일 발송
    emailjs.send('service_joxif7k', 'template_6czk5zj', templateParams)
        .then(function(response) {
            console.log('관리자 알림 이메일 발송 성공:', response);
        }, function(error) {
            console.log('관리자 알림 이메일 발송 실패:', error);
            // 실패 시 대체 방법: 브라우저 알림
            if (Notification.permission === 'granted') {
                new Notification('새로운 개발자 연결 신청', {
                    body: `${formData.businessName || '고객'}님이 개발자 연결을 신청했습니다.`,
                    icon: '/favicon.ico'
                });
            }
        });
}

// 개발자 연결 신청 데이터를 관리자 페이지용으로 저장
function saveDeveloperConnection(formData, quote, selectedQuotes) {
    console.log('saveDeveloperConnection 함수 호출됨:', { formData, quote, selectedQuotes });
    
    const connectionData = {
        timestamp: new Date().toISOString(),
        formData: formData,
        quote: quote,
        selectedQuotes: selectedQuotes, // 고객이 선택한 등급들
        status: 'pending' // 대기중
    };
    
    // 로컬 스토리지에 저장 (실제로는 서버 DB에 저장해야 함)
    const connections = JSON.parse(localStorage.getItem('developerConnections') || '[]');
    console.log('기존 connections:', connections);
    
    connections.push(connectionData);
    localStorage.setItem('developerConnections', JSON.stringify(connections));
    
    // 저장 확인
    const savedConnections = JSON.parse(localStorage.getItem('developerConnections') || '[]');
    console.log('저장 후 connections:', savedConnections);
    console.log('개발자 연결 신청 저장됨:', connectionData);
}

// 저장된 견적 보기 모달 관련
const showSavedQuotesBtn = document.getElementById('showSavedQuotes');
const savedQuotesModal = document.getElementById('savedQuotesModal');
const closeSavedQuotesBtn = document.getElementById('closeSavedQuotes');
const savedQuotesList = document.getElementById('savedQuotesList');
const savedQuoteDetail = document.getElementById('savedQuoteDetail');
const savedQuoteActions = document.getElementById('savedQuoteActions');
const modalContactDevelopers = document.getElementById('modalContactDevelopers');
const modalSendEmail = document.getElementById('modalSendEmail');

let selectedSavedQuote = null;

if (showSavedQuotesBtn) {
    showSavedQuotesBtn.addEventListener('click', function() {
        renderSavedQuotesList();
        savedQuotesModal.style.display = 'flex';
        // 버튼 문구 강제 지정
        if (modalSendEmail) modalSendEmail.textContent = '나에게 견적서 보내기';
    });
}

if (closeSavedQuotesBtn) {
    closeSavedQuotesBtn.addEventListener('click', function() {
        savedQuotesModal.style.display = 'none';
        savedQuoteDetail.innerHTML = '';
        savedQuoteActions.style.display = 'none';
    });
}

function renderSavedQuotesList() {
    const savedQuotes = JSON.parse(localStorage.getItem('savedQuotes') || '[]');
    if (savedQuotes.length === 0) {
        savedQuotesList.innerHTML = '<div style="color:#888;">저장된 견적이 없습니다.</div>';
        savedQuoteDetail.innerHTML = '';
        savedQuoteActions.style.display = 'none';
        return;
    }
    // 모든 견적을 최신순(가장 최근이 위)으로 표시
    const reversed = [...savedQuotes].reverse();
    savedQuotesList.innerHTML = reversed.map((q, idx) =>
        `<div class="saved-quote-item" data-idx="${savedQuotes.length - 1 - idx}">
            <strong>${q.formData.businessName || '이름없음'}</strong> <span style="color:#888;font-size:0.9em;">(${new Date(q.timestamp).toLocaleString()})</span>
        </div>`
    ).join('');
    // 클릭 이벤트
    const items = Array.from(savedQuotesList.querySelectorAll('.saved-quote-item'));
    items.forEach((item, i) => {
        item.addEventListener('click', function() {
            items.forEach(i => i.classList.remove('selected'));
            this.classList.add('selected');
            const idx = parseInt(this.getAttribute('data-idx'));
            selectedSavedQuote = savedQuotes[idx];
            renderSavedQuoteDetail(selectedSavedQuote);
        });
    });
    // 첫 번째 견적 자동 선택
    selectedSavedQuote = savedQuotes[savedQuotes.length - 1];
    renderSavedQuoteDetail(selectedSavedQuote);
    if (items.length > 0) items[0].classList.add('selected');
}

function renderSavedQuoteDetail(q) {
    if (!q) {
        savedQuoteDetail.innerHTML = '';
        savedQuoteActions.style.display = 'none';
        return;
    }
    // 견적 상세 내용 요약
    const industryNames = {
        'ecommerce': '쇼핑몰/상점',
        'accommodation': '펜션/숙박업',
        'medical': '병원/의료',
        'education': '학원/교육',
        'food': 'F&B (식당/카페)',
        'corporate': '기업/브랜드 소개',
        'portfolio': '개인 포트폴리오',
        'other': '기타'
    };
    const purposeNames = {
        'sales': '제품/서비스 판매 및 결제',
        'booking': '예약 접수',
        'promotion': '회사/브랜드/개인 홍보 및 정보 제공',
        'inquiry': '고객 문의 접수 및 상담 연결'
    };
    const featureNames = {
        'board': '게시판 기능',
        'booking': '예약 기능',
        'ecommerce': '쇼핑몰/결제 기능',
        'membership': '회원가입/로그인 기능',
        'blog': '블로그/콘텐츠 발행 기능',
        'multilingual': '다국어 지원',
        'chat': '채팅 상담 기능',
        'responsive': '반응형 디자인',
        'seo': 'SEO 최적화',
        'admin': '관리자 페이지',
        'analytics': '방문자 분석'
    };
    savedQuoteDetail.innerHTML = `
        <div><strong>회사/서비스명:</strong> ${q.formData.businessName || ''}</div>
        <div><strong>담당자명:</strong> ${q.formData.contactName || ''}</div>
        <div><strong>이메일:</strong> ${q.formData.email || ''}</div>
        <div><strong>업종:</strong> ${industryNames[q.formData.industry] || ''}</div>
        <div><strong>주요 목적:</strong> ${purposeNames[q.formData.mainPurpose] || ''}</div>
        <div><strong>페이지 구성:</strong> ${q.formData.pageCount || ''} (선택된 페이지: ${(q.formData.pages ? q.formData.pages.length : 0)}개)</div>
        <div><strong>추가 기능:</strong> ${(q.formData.features && q.formData.features.length > 0) ? q.formData.features.map(f => featureNames[f]).join(', ') : '없음'}</div>
        <div><strong>예상 견적:</strong> 
            ${q.quote.lowest ? `<span style='color:#28a745;font-weight:600;'>최저가형 ${q.quote.lowest.price.toLocaleString()}원</span> / ` : ''}
            <span style='color:#667eea;font-weight:600;'>실속형 ${q.quote.basic.price.toLocaleString()}원</span> / 
            <span style='color:#764ba2;font-weight:600;'>프리미엄 ${q.quote.premium.price.toLocaleString()}원</span>
        </div>
        <div><strong>저장 시각:</strong> ${new Date(q.timestamp).toLocaleString()}</div>
    `;
    savedQuoteActions.style.display = 'flex';
}

modalContactDevelopers.addEventListener('click', function() {
    if (!selectedSavedQuote) return;
    const formData = selectedSavedQuote.formData;
    const message = `안녕하세요!\n\n[고객 견적 요청 상세 내용]\n\n회사/서비스명: ${formData.businessName || ''}\n담당자명: ${formData.contactName || ''}\n이메일: ${formData.email || ''}\n연락처: ${formData.phone || ''}\n업종: ${industryNames[formData.industry] || ''}\n주요 목적: ${purposeNames[formData.mainPurpose] || ''}\n참고 사이트: ${formData.referenceSites || ''}\n\n디자인 스타일: ${(formData.designStyle && formData.designStyle.length > 0) ? formData.designStyle.map(d => designStyleNames[d] || d).join(', ') : ''}\n색상 톤: ${colorToneNames[formData.colorTone] || ''}\n브랜드 컬러: ${formData.brandColor || ''}\n로고 상태: ${logoStatusNames[formData.logoStatus] || ''}\n\n예상 페이지 수: ${formData.pageCount || ''}\n선택한 페이지: ${(formData.pages && formData.pages.length > 0) ? formData.pages.map(p => pageNames[p] || p).join(', ') : '없음'}\n기타 페이지: ${formData.customPages || ''}\n\n추가 기능: ${(formData.features && formData.features.length > 0) ? formData.features.map(f => featureNames[f] || f).join(', ') : '없음'}\n콘텐츠 준비 상태: ${contentStatusNames[formData.contentStatus] || ''}\n관리자 기능 필요 여부: ${adminNeedsNames[formData.adminNeeds] || ''}\n완성 희망일: ${timelineNames[formData.timeline] || ''}\n예산: ${budgetNames[formData.budget] || ''}\n\n추가 설명: ${formData.additionalInfo || ''}\n\n상세한 견적과 제작 가능 여부를 확인하고 싶습니다.\n연락 부탁드립니다.\n`;
    const mailtoLink = `mailto:?subject=홈페이지 제작 문의 - ${formData.businessName}&body=${encodeURIComponent(message)}`;
    window.open(mailtoLink);
});

modalSendEmail.addEventListener('click', function() {
    if (!selectedSavedQuote) return;
    const formData = selectedSavedQuote.formData;
    const quote = selectedSavedQuote.quote;
    const subject = `[AI 견적파트너] 홈페이지 견적서 - ${formData.businessName || ''}`;
    const body = `안녕하세요!\n\n[AI 견적파트너]에서 산출한 홈페이지 견적서입니다.\n\n회사/서비스명: ${formData.businessName || ''}\n담당자명: ${formData.contactName || ''}\n이메일: ${formData.email || ''}\n업종: ${industryNames[formData.industry] || ''}\n주요 목적: ${purposeNames[formData.mainPurpose] || ''}\n페이지 구성: ${formData.pageCount || ''} (선택된 페이지: ${(formData.pages ? formData.pages.length : 0)}개)\n추가 기능: ${(formData.features && formData.features.length > 0) ? formData.features.map(f => featureNames[f] || f).join(', ') : '없음'}\n완성 희망일: ${timelineNames[formData.timeline] || ''}\n예산: ${budgetNames[formData.budget] || ''}\n\n예상 견적:\n${quote.lowest ? `최저가형: ${quote.lowest.price.toLocaleString()}원\n` : ''}실속형: ${quote.basic.price.toLocaleString()}원\n프리미엄: ${quote.premium.price.toLocaleString()}원\n\n저장 시각: ${new Date(selectedSavedQuote.timestamp).toLocaleString()}\n\n감사합니다.`;
    const mailtoLink = `mailto:${formData.email || ''}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
});

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 페이지 로드 시 스크롤을 완전히 맨 위로 올림
    setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, 100);
    
    showStep(1);
    
    // 실시간 유효성 검사
    quoteForm.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#dc3545';
            } else {
                this.style.borderColor = '#e1e5e9';
            }
        });
        
        field.addEventListener('input', function() {
            if (this.value.trim()) {
                this.style.borderColor = '#e1e5e9';
            }
        });
    });
    
    // 체크박스 유효성 검사
    quoteForm.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const group = this.closest('.checkbox-group');
            if (group) {
                const checkedBoxes = group.querySelectorAll('input[type="checkbox"]:checked');
                if (checkedBoxes.length > 0) {
                    group.querySelectorAll('input[type="checkbox"]').forEach(cb => {
                        cb.style.borderColor = '#e1e5e9';
                    });
                }
            }
        });
    });

    // 한글 변환용 상수(중복 방지)
    const industryNames = {
        'ecommerce': '쇼핑몰/상점',
        'accommodation': '펜션/숙박업',
        'medical': '병원/의료',
        'education': '학원/교육',
        'food': 'F&B (식당/카페)',
        'corporate': '기업/브랜드 소개',
        'portfolio': '개인 포트폴리오',
        'other': '기타'
    };
    const purposeNames = {
        'sales': '제품/서비스 판매 및 결제',
        'booking': '예약 접수',
        'promotion': '회사/브랜드/개인 홍보 및 정보 제공',
        'inquiry': '고객 문의 접수 및 상담 연결'
    };
    const featureNames = {
        'board': '게시판 기능',
        'booking': '예약 기능',
        'ecommerce': '쇼핑몰/결제 기능',
        'membership': '회원가입/로그인 기능',
        'blog': '블로그/콘텐츠 발행 기능',
        'multilingual': '다국어 지원',
        'chat': '채팅 상담 기능',
        'responsive': '반응형 디자인',
        'seo': 'SEO 최적화',
        'admin': '관리자 페이지',
        'analytics': '방문자 분석'
    };
    const designStyleNames = {
        'modern': '모던하고 심플한',
        'warm': '따뜻하고 감성적인',
        'professional': '전문적이고 신뢰감 있는',
        'creative': '화려하고 개성있는'
    };
    const colorToneNames = {
        'bright': '밝은 톤',
        'dark': '어두운 톤',
        'brand': '특정 브랜드 컬러 사용',
        'neutral': '중성색 계열'
    };
    const logoStatusNames = {
        'ready': '네, 가지고 있습니다',
        'need': '아니요, 새로 만들어야 합니다'
    };
    const contentStatusNames = {
        'ready': '네, 직접 제공할 수 있습니다',
        'need': '아니요, 전문가의 도움이 필요합니다'
    };
    const adminNeedsNames = {
        'yes': '네, 직접 수정할 수 있는 관리자 페이지가 필요합니다',
        'no': '아니요, 수정할 때마다 전문가에게 요청하겠습니다'
    };
    const timelineNames = {
        'urgent': '급함 (2주 이내)',
        'normal': '보통 (1~2개월)',
        'flexible': '여유있음 (3개월 이상)'
    };
    const budgetNames = {
        'low': '50만원 미만',
        'medium': '50만원~200만원',
        'high': '200만원~500만원',
        'premium': '500만원 이상'
    };
    const pageNames = {
        'intro': '회사/브랜드 소개',
        'products': '제품/서비스 소개',
        'gallery': '갤러리/포트폴리오',
        'location': '오시는 길 (지도)',
        'news': '공지사항/뉴스',
        'faq': '자주 묻는 질문 (FAQ)',
        'contact': '문의하기 (간단한 입력폼)'
    };
    
    const message = `안녕하세요!\n\n[고객 견적 요청 상세 내용]\n\n회사/서비스명: ${formData.businessName || ''}\n담당자명: ${formData.contactName || ''}\n이메일: ${formData.email || ''}\n연락처: ${formData.phone || ''}\n업종: ${industryNames[formData.industry] || ''}\n주요 목적: ${purposeNames[formData.mainPurpose] || ''}\n참고 사이트: ${formData.referenceSites || ''}\n\n디자인 스타일: ${(formData.designStyle && formData.designStyle.length > 0) ? formData.designStyle.map(d => designStyleNames[d] || d).join(', ') : ''}\n색상 톤: ${colorToneNames[formData.colorTone] || ''}\n브랜드 컬러: ${formData.brandColor || ''}\n로고 상태: ${logoStatusNames[formData.logoStatus] || ''}\n\n예상 페이지 수: ${formData.pageCount || ''}\n선택한 페이지: ${(formData.pages && formData.pages.length > 0) ? formData.pages.map(p => pageNames[p] || p).join(', ') : '없음'}\n기타 페이지: ${formData.customPages || ''}\n\n추가 기능: ${(formData.features && formData.features.length > 0) ? formData.features.map(f => featureNames[f] || f).join(', ') : '없음'}\n콘텐츠 준비 상태: ${contentStatusNames[formData.contentStatus] || ''}\n관리자 기능 필요 여부: ${adminNeedsNames[formData.adminNeeds] || ''}\n완성 희망일: ${timelineNames[formData.timeline] || ''}\n예산: ${budgetNames[formData.budget] || ''}\n\n추가 설명: ${formData.additionalInfo || ''}\n\n상세한 견적과 제작 가능 여부를 확인하고 싶습니다.\n연락 부탁드립니다.\n`;
    const mailtoLink = `mailto:?subject=홈페이지 제작 문의 - ${formData.businessName}&body=${encodeURIComponent(message)}`;
    window.open(mailtoLink);
});

modalSendEmail.addEventListener('click', function() {
    if (!selectedSavedQuote) return;
    const formData = selectedSavedQuote.formData;
    const quote = selectedSavedQuote.quote;
    const subject = `[AI 견적파트너] 홈페이지 견적서 - ${formData.businessName || ''}`;
    const body = `안녕하세요!\n\n[AI 견적파트너]에서 산출한 홈페이지 견적서입니다.\n\n회사/서비스명: ${formData.businessName || ''}\n담당자명: ${formData.contactName || ''}\n이메일: ${formData.email || ''}\n업종: ${industryNames[formData.industry] || ''}\n주요 목적: ${purposeNames[formData.mainPurpose] || ''}\n페이지 구성: ${formData.pageCount || ''} (선택된 페이지: ${(formData.pages ? formData.pages.length : 0)}개)\n추가 기능: ${(formData.features && formData.features.length > 0) ? formData.features.map(f => featureNames[f] || f).join(', ') : '없음'}\n완성 희망일: ${timelineNames[formData.timeline] || ''}\n예산: ${budgetNames[formData.budget] || ''}\n\n예상 견적:\n${quote.lowest ? `최저가형: ${quote.lowest.price.toLocaleString()}원\n` : ''}실속형: ${quote.basic.price.toLocaleString()}원\n프리미엄: ${quote.premium.price.toLocaleString()}원\n\n저장 시각: ${new Date(selectedSavedQuote.timestamp).toLocaleString()}\n\n감사합니다.`;
    const mailtoLink = `mailto:${formData.email || ''}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
});
// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    showStep(1);
    
    // 실시간 유효성 검사
    quoteForm.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#dc3545';
            } else {
                this.style.borderColor = '#e1e5e9';
            }
        });
        
        field.addEventListener('input', function() {
            if (this.value.trim()) {
                this.style.borderColor = '#e1e5e9';
            }
        });
    });
    
    // 체크박스 유효성 검사
    quoteForm.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const group = this.closest('.checkbox-group');
            if (group) {
                const checkedBoxes = group.querySelectorAll('input[type="checkbox"]:checked');
                if (checkedBoxes.length > 0) {
                    group.querySelectorAll('input[type="checkbox"]').forEach(cb => {
                        cb.style.borderColor = '#e1e5e9';
                    });
                }
            }
        });
    });
});
