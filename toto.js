<script>
    document.addEventListener('DOMContentLoaded', function() {
    // Pridanie poslucháča udalostí pre všetky vstupné polia
    document.querySelectorAll('input').forEach(item => {
        item.addEventListener('input', calculateAll);
    });

    // Inicializácia výpočtov a zobrazenie výsledkov ihneď po načítaní stránky
    calculateAll();
});

function calculateAll() {
    var subsistenceMinimum = calculateSubsistenceMinimum();
    calculateMaximumLoan(subsistenceMinimum);
    
    // Logika pre druhého dlžníka
    if (document.getElementById("showSecondDebtor").checked) {
        // Predpokladáme, že existuje funkcia calculateSubsistenceMinimum2() a calculateMaximumLoan2()
        var subsistenceMinimum2 = calculateSubsistenceMinimum2(); // Prípadne použite rovnakú funkciu ako pre prvého dlžníka, ak sú podmienky rovnaké
        calculateMaximumLoan2(subsistenceMinimum2);
    }
}

function calculateSubsistenceMinimum() {
    var adults = 1; // Pevná hodnota 1 pre počet dospelých
    var children = parseInt(document.getElementById('children').value) || 0;

    // Aktualizované hodnoty životného minima
    var baseAdult = 268.88; // pre prvého dospelého
    var additionalAdult = 187.57; // pre ďalšieho dospelého, ale nebude použité v tomto prípade
    var child = 122.77; // pre každé dieťa

    var subsistenceTotal = baseAdult + (adults - 1) * additionalAdult + children * child;

    // Zobrazenie výsledkov životného minima
    return subsistenceTotal;
}

function calculateMaximumLoan(subsistenceMinimum) {
    var netIncome = parseFloat(document.getElementById('netIncome').value) || 0;
    var existingLoans = parseFloat(document.getElementById('existingLoans').value) || 0;
    var interestRate = parseFloat(document.getElementById('interestRate').value) / 100;
    var loanTerm = parseInt(document.getElementById('loanTerm').value) || 0;

    // Odpočítanie životného minima z čistého príjmu
    var incomeAfterSubsistence = netIncome - subsistenceMinimum;

    // Výpočet dostupného príjmu pre úverové splátky
    var incomeForLoanRepayment = incomeAfterSubsistence * 0.6 - existingLoans;

    // Aplikácia stres testu s úrokovou sadzbou o 2% vyššou
    var shockInterestRate = interestRate + 0.02;

    // Výpočet maximálnej výšky úveru
    var maximumLoan = calculateLoanAmount(incomeForLoanRepayment, shockInterestRate, loanTerm);

    // Zobrazenie výsledkov maximálnej výšky úveru
    document.getElementById('maximumLoanResult').innerHTML = '<span class="max-loan-label">MAXIMÁLNA VÝŠKA ÚVERU:</span> <span class="result-number">' + maximumLoan.toFixed(2) + '</span> <span class="result-currency">EUR</span>';
    document.getElementById('maximumLoanResult').classList.add('show');
}

function calculateLoanAmount(monthlyPayment, interestRate, years) {
    var monthlyInterestRate = interestRate / 12;
    var numberOfPayments = years * 12;
    return monthlyPayment / (monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments)));
}function openURL() {
    window.location.href = 'https://hypotekanadruhu.sk/ukazovatel-schopnosti-splacat-dsti/'; // Otvorí URL v rovnakom okne
}function AopenURL() {
    window.location.href = 'https://hypotekanadruhu.sk/kalkulacky/'; // Otvorí URL v rovnakom okne
}
</script>

