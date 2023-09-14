package NutrientsCoders.main_project.Analysis.service;

import NutrientsCoders.main_project.Analysis.entity.Analysis;
import NutrientsCoders.main_project.Analysis.repository.AnalysisRepository;
import NutrientsCoders.main_project.dailymeal.entity.DailyMeal;
import NutrientsCoders.main_project.utils.exception.ExceptionCode;
import NutrientsCoders.main_project.utils.exception.LogicException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

@Service
public class AnalysisService {
  private final AnalysisRepository analysisRepository;
  
  public AnalysisService(AnalysisRepository analysisRepository) {
    this.analysisRepository = analysisRepository;
  }
  
  @Transactional
  public Analysis createAnalysis(DailyMeal dailyMeal, Double needKacl) throws UnsupportedEncodingException {
    
    if (dailyMeal.getEachMeals().isEmpty()) {
      throw new LogicException(ExceptionCode.DAILYMEAL_EMPTY);
    }
    
    //분석페이지 생성
    Analysis analysis = analyzeMeal(dailyMeal, needKacl);
    Optional<Analysis> findAnalysis = analysisRepository.findByDailyMeal(dailyMeal);
    findAnalysis.ifPresent(analysisRepository::delete); //기존 것 삭제
    
    String result = checkResult(analysis); // 분석
    analysis.setResult(result);
    String URL[] = uriMaker(result);
    
    String auctionURL = URL[0]; // 분석기반 구매 uri 생성
    String naverURL = URL[1]; // 분석기반 구매 uri 생성
    String coupangURL = URL[2]; // 분석기반 구매 uri 생성
    analysis.setAuctionURL(auctionURL);
    analysis.setNaverURL(naverURL);
    analysis.setCoupangURL(coupangURL);
    return analysisRepository.save(analysis);
  }
  
  public String[] uriMaker(String result) throws UnsupportedEncodingException {
    String keyword = "";
    if (result.contains("불량") && result.contains("단백질 섭취 비율이 너무 낮습니다.")) {keyword = "고단백";}
    else if (result.contains("불량") && result.contains("지방 섭취 비율이 너무 높습니다.")) {keyword = "저지방";}
    else if (result.contains("불량") && result.contains("탄수화물 섭취 비율이 너무 높습니다.")) {keyword = "저탄수화물";}
    else if (result.contains("불량") && result.contains("섭취 칼로리 양이 너무 높습니다.")) {keyword = "저칼로리";}
    
    String encodedKeyword = URLEncoder.encode(keyword, StandardCharsets.UTF_8);
    String auctionURL = "https://browse.auction.co.kr/search?keyword=" + encodedKeyword;
    String naverURL = "https://search.shopping.naver.com/search/all?query=" + encodedKeyword;
    String coupangURL = "https://www.coupang.com/np/search?component=&q=" + encodedKeyword;
    String URL[] = {auctionURL, naverURL, coupangURL};
    return URL;
  }


  @Transactional
  public Analysis findByAnalysis(long analysisId) {
    return verifyExistsEachMeal(analysisId);
  }
  
  @Transactional
  public void deleteAnalysis(long analysisId) {
    analysisRepository.delete(verifyExistsEachMeal(analysisId));
  }
  
  
  public Analysis verifyExistsEachMeal(long analysisId){
    return analysisRepository.findById(analysisId)
        .orElseThrow(() -> new LogicException(ExceptionCode.ANALYSIS_NOT_FOUND));
  }
  
  public String checkResult(Analysis analysis){
    Double overKcal = analysis.getOverKcal();
    Double overCarbos = analysis.getOverPercentCarbos();
    Double overProteins = analysis.getOverPercentProteins();
    Double overFats = analysis.getOverPercentFats();
    
    double overSum = overCarbos + overProteins + overFats;
    String[] majorText = {"양호\n", "보통\n", "불량\n"};
    String[] addText ={
        "탄수화물 섭취 비율이 너무 높습니다.\n",
        "단백질 섭취 비율이 너무 높습니다.\n",
        "지방 섭취 비율이 너무 높습니다.\n",
        "탄수화물 섭취 비율이 너무 낮습니다.\n",
        "단백질 섭취 비율이 너무 낮습니다.\n",
        "지방 섭취 비율이 너무 낮습니다.\n",
        "섭취 칼로리 양이 너무 높습니다.\n",
        "섭취 칼로리 양이 너무 낮습니다.\n"
    };

    String resultText = "칼로리 평가\n";
    if (overKcal > 100) resultText += "불량\n" + addText[6];
    if (overKcal < -200) resultText += "불량\n" + addText[7];
    
    resultText += "3대 영양소 비율 평가\n";
    if (overSum < 1.0) resultText += majorText[0];
    else if (overSum < 1.5) resultText += majorText[1];
    else resultText += majorText[2];
    
    if (overCarbos > 1.0 ) resultText += addText[0];
    if (overProteins > 1.0 ) resultText += addText[1];
    if (overFats > 1.0 ) resultText += addText[2];
    if (overCarbos < -1.0 ) resultText += addText[3];
    if (overProteins < -1.0 ) resultText += addText[4];
    if (overFats < -1.0 ) resultText += addText[5];
    
  return resultText;
  }

  
  //식단 분석 메서드
  private Analysis analyzeMeal(DailyMeal dailyMeal, Double needKacl)  {
    Double Kacls = dailyMeal.getTotalDailyKcal();
    Double carbohydrates = dailyMeal.getTotalDailyCarbo();
    Double proteins = dailyMeal.getTotalDailyProtein();
    Double fats = dailyMeal.getTotalDailyFat();
    
    Analysis analysis = new Analysis();
    analysis.setDailyMeal(dailyMeal);
    analysis.setIdealKacl(needKacl);
    analysis.calculator(Kacls, carbohydrates, proteins, fats);
    return analysis;
  }
}
