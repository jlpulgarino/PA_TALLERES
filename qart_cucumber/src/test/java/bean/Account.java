package bean;

public class Account {
    private String name;
    private String descripcion;
    private AccountType type;
    private Double amount;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public AccountType getType() {
        return type;
    }

    public void setType(AccountType type) {
        this.type = type;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String ToString(){
        StringBuffer sb =  new StringBuffer();
        sb.append("name :"+name+"\n");
        sb.append("descripcion :"+descripcion+"\n");
        sb.append("type :"+type+"\n");
        sb.append("amount :"+amount+"\n");

        return sb.toString();
    }
}
