SharkGame.MathUtil = {

    // a = current amount
    // b = desired amount
    // k = constant price
    // returns: cost to get to b from a
    constantCost: function(a, b, k) {
        return (b - a) * k;
    },

    // a = current amount
    // b = available price amount
    // k = constant price
    // returns: absolute max items that can be held with invested and current resources
    constantMax: function(a, b, k) {
        return b / k + a;
    },

    // a = current amount
    // b = desired amount
    // k = cost increase per item
    // returns: cost to get to b from a
    linearCost: function(a, b, k) {
        return ((k / 2) * (b * b + b)) - ((k / 2) * (a * a + a));
    },

    // a = current amount
    // b = available price amount
    // k = cost increase per item
    // returns: absolute max items that can be held with invested and current resources
    linearMax: function(a, b, k) {
        return Math.sqrt((a * a) + a + (2 * b / k) + 0.25) - 0.5;
    }

//    exponentialCost: function(a, b, k) {
//        return (k * Math.pow()) - ();
//    },
//
//    exponentialMax: function(a, b, k) {
//        return Math.floor(Math.log(Math.pow(b,a) + (b-1) * b / k) / Math.log(a));
//    }
}

//linear floor(sqrt(current^2 + current + 2 * price/k + 1/4) - 1/2)
//exponential floor(log(b^old + (b-1) * price / k) / log(b))
//linear total cost = k / 2 * (n^2 + n)
//exponential total cost = k * (b^n - 1) / (b - 1)
