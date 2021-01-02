package devanmejia.transfer;

import lombok.AllArgsConstructor;
import lombok.Data;


@AllArgsConstructor
@Data
public class TokensDTO {
    private String accessToken;
    private String refreshToken;
}
