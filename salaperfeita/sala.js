import org.json.JSONArray;
import org.json.JSONObject;
import java.util.ArrayList;
import java.util.List;

public class KnapsackOptimizer {

    // Classe para representar uma mineradora
    static class Mineradora {
        String id;
        String name;
        int powerTotal;  // Power + Bonus Power calculado
        int cells;       // Quantidade de células que ocupa

        public Mineradora(String id, String name, int powerTotal, int cells) {
            this.id = id;
            this.name = name;
            this.powerTotal = powerTotal;
            this.cells = cells;
        }
    }

    // Método para calcular o Problema da Mochila
    public static List<Mineradora> calcularMelhorCombinacao(List<Mineradora> mineradoras, int capacidadeMaxima) {
        int n = mineradoras.size();
        int[][] dp = new int[n + 1][capacidadeMaxima + 1];

        // Preenchendo a tabela de Programação Dinâmica
        for (int i = 1; i <= n; i++) {
            Mineradora mineradora = mineradoras.get(i - 1);
            int power = mineradora.powerTotal;
            int cells = mineradora.cells;

            for (int j = 1; j <= capacidadeMaxima; j++) {
                if (cells <= j) {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - cells] + power);
                } else {
                    dp[i][j] = dp[i - 1][j];
                }
            }
        }

        // Determinando a combinação ótima de mineradoras
        List<Mineradora> resultado = new ArrayList<>();
        int j = capacidadeMaxima;
        for (int i = n; i > 0 && j > 0; i--) {
            if (dp[i][j] != dp[i - 1][j]) {
                Mineradora mineradora = mineradoras.get(i - 1);
                resultado.add(mineradora);
                j -= mineradora.cells;
            }
        }

        return resultado;
    }

    // Função principal para ler o JSON e calcular a solução
    public static void main(String[] args) {
        // Exemplo de JSON de entrada (usuário colaria isso no site)
        String jsonInput = "[{...}]"  // JSON do usuário será colado aqui

        // Parse JSON
        JSONArray jsonArray = new JSONArray(jsonInput);
        List<Mineradora> mineradoras = new ArrayList<>();

        // Extração dos dados relevantes
        for (int i = 0; i < jsonArray.length(); i++) {
            JSONObject mineradoraJson = jsonArray.getJSONObject(i);
            String id = mineradoraJson.getString("id");
            String name = mineradoraJson.getJSONObject("name").getString("en");
            int power = mineradoraJson.getInt("power");
            int bonusPower = mineradoraJson.getInt("bonus_power");
            int cells = mineradoraJson.getInt("width");

            // Calcula o Power Total considerando o bônus
            int powerTotal = power + (power * bonusPower / 100);

            mineradoras.add(new Mineradora(id, name, powerTotal, cells));
        }

        // Capacidade máxima de células
        int capacidadeMaxima = 512;

        // Calcula a melhor combinação de mineradoras
        List<Mineradora> melhorCombinacao = calcularMelhorCombinacao(mineradoras, capacidadeMaxima);

        // Exibe o resultado
        System.out.println("Melhor combinação de mineradoras para preencher 512 células:");
        for (Mineradora mineradora : melhorCombinacao) {
            System.out.println("ID: " + mineradora.id + ", Nome: " + mineradora.name + ", Power Total: " + mineradora.powerTotal + ", Células: " + mineradora.cells);
        }
    }
}
