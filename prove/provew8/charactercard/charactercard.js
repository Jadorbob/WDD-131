const character = {
    health: 100,
    level: 1,

    takedamage: function() {
        if (this.health > 0) {
            this.health -= 20
        }
    },

    levelUp: function() {
        this.level += 1;
    },
    
    updateUI: function() {
        document.getElementById("charHealth").textContent = this.health;
        document.getElementById("charLevel").textContent = this.level;
    },

    alert: function() {
        if (this.health == 0) {
            setTimeout(() => {
                alert("The character has died.");
            }, 200);
        }
    }
};

document.querySelector(".damageBtn").addEventListener("click", function() {
    character.takedamage();
    character.updateUI();
    character.alert();
});

document.querySelector(".lvlupBtn").addEventListener("click", function() {
    character.levelUp();
    character.updateUI();
});