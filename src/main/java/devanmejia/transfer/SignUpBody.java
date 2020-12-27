package devanmejia.transfer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignUpBody {
    private String login;
    private String password;
    private String firstName;
    private String lastName;
    private String email;
}
