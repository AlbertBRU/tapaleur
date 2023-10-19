let app = {
    /**
     * - Initialise l'application.
     * - Déclenche un console.log() pour vérifier que l'application est bien initialisée.
     * - Prépare les écouteurs d'événements.
     */
    init: function () {
        console.log('init');

        let inputs = document.querySelectorAll('input');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener('change', app.cleanAndCheck);
            inputs[i].addEventListener('keyup', app.cleanAndCheck);
        }

        const toggleThemeButton = document.querySelector('.btn-holder');
        toggleThemeButton.addEventListener('click', app.handleToggleTheme);
    },

    /**
    * Nettoie les champs :
    * - Rajoute un 0 devant si nécessaire
    * - Limite à 23 heures et 59 minutes
    * - Supprime le chiffre le plus à gauche si plus de 2 chiffres
    * 
    * Désactive le bouton si les deux champs sont vide (tant pis si tu joue à minuit pile).
    */
    cleanAndCheck: function () {
        const heureInput = document.querySelector("input[name='heure']");
        const minuteInput = document.querySelector("input[name='minute']");
        let heure = heureInput.value;
        let minute = minuteInput.value;

        if (heure > 23) {
            heureInput.value = '23';
        }
        else if (heure.length > 2) {
            // regex qui ne garde que les deux derniers digits
            heureInput.value = heure.replace(/.*(\d{2})$/, '$1');
        }
        else if (heure.length == 1) {
            heureInput.value = '0' + heure;
        }

        if (minute > 59) {
            minute = '59';
        }
        else if (minute.length > 2) {
            minuteInput.value = minute.replace(/.*(\d{2})$/, '$1');
        }
        else if (minute.length == 1) {
            minuteInput.value = '0' + minute;
        }

        let submitButton = document.querySelector('.submit-button');
        if (heure != '' && minute != '') {
            submitButton.classList.remove('submit-button-disabled');
            submitButton.classList.add('submit-button-enabled');

            document.querySelector('.submit-button-enabled').addEventListener('mouseenter', app.handleButtonHover);
            document.querySelector('.submit-button-enabled').addEventListener('click', app.handleButtonClick);
        }
    },

    /**
     * Gère le switch des panels au survol du bouton.
     */
    handleButtonHover: function () {
        const greenBox = document.querySelector('.submit-button-box-green');
        const pinkBox = document.querySelector('.submit-button-box-pink');

        greenBox.classList.toggle('top-box');
        pinkBox.classList.toggle('top-box');
    },

    /**
     * Compare l'heure entrée par l'utilisateur avec l'heure actuelle.
     */
    handleButtonClick: function () {
        let heure = document.querySelector("input[name='heure']").value;
        let minute = document.querySelector("input[name='minute']").value;
        let date = new Date();
        let trueHour = date.getHours();
        let trueMinute = date.getMinutes();

        if (heure == trueHour && minute == trueMinute) {
            document.querySelector('.result').innerHTML = 'Bravo !';
        }
        else {
            document.querySelector('.result').innerHTML = 'T\'es mauvais, Jack !';
        }
    },

    /**
     * Change le thème de la page.
     */
    handleToggleTheme: function () {
        const darkDivs = document.querySelectorAll('.dark');
        const lightDivs = document.querySelectorAll('.light');

        if (darkDivs.length != 0) {
            for (let i = 0; i < darkDivs.length; i++) {
                darkDivs[i].classList.toggle('dark');
                darkDivs[i].classList.toggle('light');
            }
        } else {
            for (let i = 0; i < lightDivs.length; i++) {
                lightDivs[i].classList.toggle('dark');
                lightDivs[i].classList.toggle('light');
            }
        }
    },
};

document.addEventListener('DOMContentLoaded', app.init);