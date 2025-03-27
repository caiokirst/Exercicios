package view;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;

class PizzaMonitor {
    private int pizzaCount = 0;

    public synchronized void comprarPizza() {
        pizzaCount++;
        notifyAll(); // Notifica threads esperando por pizza
    }

    public synchronized void comerPizza() throws InterruptedException {
        while (pizzaCount == 0) {
            wait(); // Espera até que tenha pizza disponível
        }
        pizzaCount--;
    }

    public synchronized int getQtde() {
        return pizzaCount;
    }
}

public class GUI extends JFrame {
    private final PizzaMonitor monitor = new PizzaMonitor();
    private final JLabel pizzaLabel;
    private final JTextArea logArea;

    public GUI() {
        setTitle("Pizza Manager");
        setSize(400, 300);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BorderLayout());

        //Painel do contador
        JPanel topPanel = new JPanel();
        pizzaLabel = new JLabel("Pizzas: " + monitor.getQtde());
        topPanel.add(pizzaLabel);
        add(topPanel, BorderLayout.NORTH);

        //Painel do log
        logArea = new JTextArea();
        logArea.setEditable(false);
        JScrollPane scrollPane = new JScrollPane(logArea);
        add(scrollPane, BorderLayout.CENTER);

        //Painel dos botões
        JPanel bottomPanel = new JPanel();
        JButton buyPizzaButton = new JButton("Comprar Pizza");
        JButton eatPizzaButton = new JButton("Comer Pizza");

        buyPizzaButton.addActionListener((ActionEvent e) -> new Thread(() -> {
            monitor.comprarPizza();
            SwingUtilities.invokeLater(this::updatePizzaCount);
            log("Você comprou uma pizza.");
        }).start());

        eatPizzaButton.addActionListener((ActionEvent e) -> new Thread(() -> {
            try {
                monitor.comerPizza();
                SwingUtilities.invokeLater(this::updatePizzaCount);
                log("Você comeu uma pizza.");
            } catch (InterruptedException ex) {
                Thread.currentThread().interrupt();
            }
        }).start());

        bottomPanel.add(buyPizzaButton);
        bottomPanel.add(eatPizzaButton);
        add(bottomPanel, BorderLayout.SOUTH);
    }

    private void updatePizzaCount() {
        pizzaLabel.setText("Pizzas: " + monitor.getQtde());
    }

    //Log somente após a ação
    private void log(String message) {
        SwingUtilities.invokeLater(() -> logArea.append(message + "\n"));
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            GUI gui = new GUI();
            gui.setVisible(true);
        });
    }
}
