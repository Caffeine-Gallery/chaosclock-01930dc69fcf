import Bool "mo:base/Bool";
import Iter "mo:base/Iter";

import Timer "mo:base/Timer";
import Random "mo:base/Random";
import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Nat8 "mo:base/Nat8";
import Int "mo:base/Int";
import Text "mo:base/Text";
import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Blob "mo:base/Blob";

actor {
    // Store quotes
    private let quotes : [Text] = [
        "Life is what happens while you're busy making other plans.",
        "The way to get started is to quit talking and begin doing.",
        "The future belongs to those who believe in the beauty of their dreams.",
        "Success is not final, failure is not fatal.",
        "The only impossible journey is the one you never begin.",
        "The best way to predict the future is to create it.",
        "Everything you've ever wanted is on the other side of fear.",
        "Don't watch the clock; do what it does. Keep going.",
        "The secret of getting ahead is getting started.",
        "Believe you can and you're halfway there."
    ];

    // Store current timer
    private stable var currentTimerId : Nat = 0;
    private stable var isTimerActive : Bool = false;
    private var currentColor : Text = "#000000";

    // Helper function to convert Nat8 to hex string
    private func nat8ToHex(num : Nat8) : Text {
        let hexDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
        let high = Nat8.toNat(num / 16);
        let low = Nat8.toNat(num % 16);
        hexDigits[high] # hexDigits[low]
    };

    // Get random quote
    private func getRandomQuote(seed: Blob) : Text {
        let random = Random.Finite(seed);
        switch (random.byte()) {
            case null { quotes[0] };
            case (?val) {
                let index = Nat8.toNat(val) % quotes.size();
                quotes[index]
            };
        };
    };

    // Generate random color
    private func generateRandomColor(seed: Blob) : Text {
        let random = Random.Finite(seed);
        var color = "#";
        
        // Generate three color components (R,G,B)
        for (_ in Iter.range(0, 2)) {
            switch (random.byte()) {
                case null { color := color # "00" };
                case (?val) {
                    color := color # nat8ToHex(val);
                };
            };
        };
        color
    };

    // Timer callback
    private func timerCallback() : async () {
        let seed = await Random.blob();
        currentColor := generateRandomColor(seed);
        // Timer will continue running
    };

    // Start timer
    public func startTimer(intervalSeconds : Nat) : async Text {
        if (isTimerActive) {
            return "Timer is already running";
        };
        
        currentTimerId := Timer.setTimer(#seconds(intervalSeconds), timerCallback);
        isTimerActive := true;
        "Timer started"
    };

    // Stop timer
    public func stopTimer() : async Text {
        if (not isTimerActive) {
            return "Timer is not running";
        };
        
        Timer.cancelTimer(currentTimerId);
        isTimerActive := false;
        "Timer stopped"
    };

    // Get new quote and color
    public func getNewQuote() : async (Text, Text) {
        let seed = await Random.blob();
        let quote = getRandomQuote(seed);
        currentColor := generateRandomColor(seed);
        (quote, currentColor)
    };

    // Check timer status
    public query func isTimerRunning() : async Bool {
        isTimerActive
    };
}
