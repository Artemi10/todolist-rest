package devanmejia.models;


import org.apache.commons.lang3.RandomStringUtils;

import java.util.HashMap;
import java.util.Map;

public class RefreshTokens {
    private static RefreshTokens refreshTokens;
    private Map<String, String> refreshTokensMap;

    private RefreshTokens() {
        this.refreshTokensMap = new HashMap<>();
    }

    public static RefreshTokens getInstance(){
        if(refreshTokens == null){
            refreshTokens = new RefreshTokens();
        }
        return refreshTokens;
    }

    public String generateNewRefreshToken(String login){
        String refreshTokenValue = RandomStringUtils.randomAlphabetic(30);
        if(!refreshTokensMap.containsValue(refreshTokenValue)){
            refreshTokensMap.put(login, refreshTokenValue);
            return refreshTokenValue;
        }
        else{
           return generateNewRefreshToken(login);
        }
    }

    public String generateNewRefreshTokenByOldValue(String refreshToken){
        String login = getLoginByRefreshToken(refreshToken);
        return generateNewRefreshToken(login);
    }


    public void deleteRefreshToken(String refreshTokenValue){
        String login = getLoginByRefreshToken(refreshTokenValue);
        refreshTokensMap.remove(login, refreshTokenValue);
    }

    public String getLoginByRefreshToken(String refreshToken){
        for(Map.Entry<String, String> entry: refreshTokensMap.entrySet()){
            if(entry.getValue().equals(refreshToken)){
                return entry.getKey();
            }
        }
        throw new IllegalArgumentException("No such refresh token");
    }

}
