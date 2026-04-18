# Kindred Spirits (disabled feature)

Matches a user's final 3 values to philosophical schools and fictional characters that share those values. Disabled, not removed — ~200 lines of profile data + matching logic + rendering code are preserved here for future re-enablement.

To re-enable, paste each section back into `index.html` at the location noted in each heading, then uncomment the HTML and the `renderKindredSpirits(userValueNames)` call in `setupResultsScreen`, and the `kindredMatches` block in `shareAsImage`.

---

## 1. CSS — paste before `/* Feedback form */`

```css
.kindred-section {
    margin-top: 2.5rem;
    text-align: center;
}

.kindred-section h3 {
    font-family: 'Fraunces', serif;
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: var(--deep-brown);
}

.kindred-intro {
    color: #666;
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
}

.kindred-matches {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 500px;
    margin: 0 auto;
}

.kindred-card {
    background: white;
    border-radius: 12px;
    padding: 1.25rem;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
    text-align: left;
    border-left: 4px solid var(--muted-sage);
}

.kindred-card.character {
    border-left-color: var(--sunset-coral);
}

.kindred-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.5rem;
    gap: 0.5rem;
}

.kindred-name {
    font-weight: 600;
    font-size: 1.05rem;
    color: var(--deep-brown);
}

.kindred-type {
    font-size: 0.7rem;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    background: #E8F5E9;
    color: #2E7D32;
    white-space: nowrap;
}

.kindred-card.character .kindred-type {
    background: #FFF3E0;
    color: #E65100;
}

.kindred-description {
    font-size: 0.9rem;
    color: #666;
    line-height: 1.5;
    margin-bottom: 0.75rem;
}

.kindred-values {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
}

.kindred-value {
    font-size: 0.75rem;
    padding: 0.25rem 0.6rem;
    border-radius: 50px;
    background: var(--light-gray);
    color: #666;
}

.kindred-value.match {
    background: linear-gradient(135deg, var(--sunset-orange) 0%, var(--sunset-coral) 100%);
    color: white;
    font-weight: 500;
}
```

---

## 2. HTML — paste inside `.results-content`, after the `.results-message` paragraph

```html
<div class="kindred-section" id="kindred-section">
    <h3>You might enjoy exploring...</h3>
    <p class="kindred-intro">Based on your values, here are some kindred spirits</p>
    <div class="kindred-matches" id="kindred-matches">
    </div>
</div>
```

---

## 3. Profiles data — paste after the `values` array declaration

```js
const kindredProfiles = [
    // Philosophical schools (15)
    {
        name: "Stoicism",
        type: "philosophy",
        description: "Focus on what you can control, accept what you cannot. Find peace through wisdom and virtue.",
        values: ["Mindfulness", "Wisdom", "Integrity", "Patience", "Courage"]
    },
    {
        name: "Epicureanism",
        type: "philosophy",
        description: "Seek tranquility through simple pleasures, friendship, and mindful living.",
        values: ["Pleasure", "Empathy", "Mindfulness", "Fitness", "Gratitude"]
    },
    {
        name: "Existentialism",
        type: "philosophy",
        description: "Create your own meaning. Embrace freedom and take responsibility for who you become.",
        values: ["Authenticity", "Freedom", "Integrity", "Courage", "Mindfulness"]
    },
    {
        name: "Buddhism",
        type: "philosophy",
        description: "Cultivate compassion and awareness. Find liberation through understanding the nature of suffering.",
        values: ["Mindfulness", "Empathy", "Forgiveness", "Wisdom", "Peace"]
    },
    {
        name: "Humanism",
        type: "philosophy",
        description: "Celebrate human potential. Pursue knowledge, compassion, and the flourishing of all people.",
        values: ["Curiosity", "Self-development", "Empathy", "Freedom", "Equality"]
    },
    {
        name: "Virtue Ethics",
        type: "philosophy",
        description: "Become a person of good character. Cultivate virtues through practice and habit.",
        values: ["Courage", "Wisdom", "Fairness", "Integrity", "Kindness"]
    },
    {
        name: "Taoism",
        type: "philosophy",
        description: "Flow with life's natural rhythms. Find harmony through simplicity, patience, and acceptance.",
        values: ["Nature", "Peace", "Simplicity", "Patience", "Flexibility"]
    },
    {
        name: "Confucianism",
        type: "philosophy",
        description: "Honor relationships and social harmony. Build a good society through family, respect, and tradition.",
        values: ["Family", "Tradition", "Kindness", "Community", "Loyalty"]
    },
    {
        name: "Pragmatism",
        type: "philosophy",
        description: "Truth is what works. Stay flexible, test ideas through action, and keep learning from results.",
        values: ["Achievement", "Flexibility", "Curiosity", "Self-development", "Friendliness"]
    },
    {
        name: "Minimalism",
        type: "philosophy",
        description: "Less is more. Find freedom and clarity by focusing on what truly matters.",
        values: ["Simplicity", "Peace", "Mindfulness", "Freedom", "Gratitude"]
    },
    {
        name: "Absurdism",
        type: "philosophy",
        description: "Life has no inherent meaning—and that's liberating. Embrace the absurd with courage and humor.",
        values: ["Courage", "Humor", "Freedom", "Flexibility", "Authenticity"]
    },
    {
        name: "Utilitarianism",
        type: "philosophy",
        description: "The greatest good for the greatest number. Make choices that maximize well-being for all.",
        values: ["Generosity", "Fairness", "Empathy", "Kindness", "Integrity"]
    },
    {
        name: "Romanticism",
        type: "philosophy",
        description: "Feel deeply, create boldly. Find truth in emotion, beauty, and the wonder of nature.",
        values: ["Beauty", "Creativity", "Nature", "Authenticity", "Adventure"]
    },
    {
        name: "Ubuntu",
        type: "philosophy",
        description: "I am because we are. Find your humanity through connection and compassion for others.",
        values: ["Community", "Empathy", "Love", "Generosity", "Kindness"]
    },
    {
        name: "Rationalism",
        type: "philosophy",
        description: "Let reason be your guide. Seek truth through logic, evidence, and careful thought.",
        values: ["Wisdom", "Curiosity", "Honesty", "Mindfulness", "Order"]
    },
    // Fictional characters (20)
    {
        name: "Samwise Gamgee",
        type: "character",
        description: "The loyal friend who never gives up. Steadfast, brave, and always there when it matters most.",
        values: ["Loyalty", "Courage", "Kindness", "Resilience", "Love"]
    },
    {
        name: "Captain Picard",
        type: "character",
        description: "Lead with wisdom and diplomacy. Seek understanding, uphold justice, and boldly explore.",
        values: ["Wisdom", "Curiosity", "Fairness", "Leadership", "Integrity"]
    },
    {
        name: "Leslie Knope",
        type: "character",
        description: "Passionate, dedicated, and endlessly optimistic. Make your community better through sheer determination.",
        values: ["Community", "Friendliness", "Challenge", "Empathy", "Achievement"]
    },
    {
        name: "Ted Lasso",
        type: "character",
        description: "Believe in people. Lead with kindness, humor, and an unwavering faith in the good in others.",
        values: ["Kindness", "Encouragement", "Humor", "Forgiveness", "Patience"]
    },
    {
        name: "Atticus Finch",
        type: "character",
        description: "Stand for what's right, even when it's hard. Practice empathy and moral courage.",
        values: ["Fairness", "Courage", "Integrity", "Honesty", "Empathy"]
    },
    {
        name: "Hermione Granger",
        type: "character",
        description: "Knowledge is power. Work hard, fight for what's right, and never stop learning.",
        values: ["Curiosity", "Challenge", "Fairness", "Achievement", "Loyalty"]
    },
    {
        name: "Mr. Rogers",
        type: "character",
        description: "You are special just the way you are. Spread kindness, patience, and unconditional acceptance.",
        values: ["Kindness", "Forgiveness", "Patience", "Love", "Authenticity"]
    },
    {
        name: "Elizabeth Bennet",
        type: "character",
        description: "Sharp wit, independent spirit, and the courage to be yourself despite social pressure.",
        values: ["Authenticity", "Independence", "Humor", "Courage", "Honesty"]
    },
    {
        name: "Uncle Iroh",
        type: "character",
        description: "Wisdom earned through failure. Find joy in tea, family, and helping others discover their path.",
        values: ["Wisdom", "Peace", "Kindness", "Humor", "Family"]
    },
    {
        name: "Aragorn",
        type: "character",
        description: "The reluctant king who rises to lead. Humble, brave, and willing to sacrifice for those he loves.",
        values: ["Leadership", "Courage", "Legacy", "Integrity", "Loyalty"]
    },
    {
        name: "Steve Rogers",
        type: "character",
        description: "Stand up for what's right, no matter the odds. The strength of character matters more than strength of body.",
        values: ["Fairness", "Courage", "Integrity", "Leadership", "Loyalty"]
    },
    {
        name: "Moana",
        type: "character",
        description: "Answer the call of adventure. Honor your ancestors while forging your own path.",
        values: ["Adventure", "Courage", "Leadership", "Family", "Legacy"]
    },
    {
        name: "Gandalf",
        type: "character",
        description: "Guide others to find their own strength. True wisdom is knowing when to act and when to let others lead.",
        values: ["Wisdom", "Courage", "Leadership", "Patience", "Kindness"]
    },
    {
        name: "Spock",
        type: "character",
        description: "Seek truth through logic and observation. Balance reason with the value of friendship and loyalty.",
        values: ["Wisdom", "Curiosity", "Integrity", "Mindfulness", "Loyalty"]
    },
    {
        name: "Obi-Wan Kenobi",
        type: "character",
        description: "A guardian of peace and justice. Patient, wise, and devoted to protecting those who cannot protect themselves.",
        values: ["Peace", "Patience", "Wisdom", "Loyalty", "Mindfulness"]
    },
    {
        name: "Anne Shirley",
        type: "character",
        description: "See magic in the ordinary. Transform life through imagination, kindness, and an irrepressible spirit.",
        values: ["Creativity", "Kindness", "Curiosity", "Beauty", "Authenticity"]
    },
    {
        name: "Marge Simpson",
        type: "character",
        description: "The heart of the family. Patient, caring, and always there to hold everything together.",
        values: ["Family", "Patience", "Empathy", "Stability", "Kindness"]
    },
    {
        name: "Dumbledore",
        type: "character",
        description: "Love is the most powerful magic. Guide with wisdom, lead with compassion, and believe in second chances.",
        values: ["Wisdom", "Love", "Forgiveness", "Courage", "Leadership"]
    },
    {
        name: "Indiana Jones",
        type: "character",
        description: "Fortune and glory, kid. Chase adventure, satisfy your curiosity, and never stop exploring.",
        values: ["Adventure", "Curiosity", "Courage", "Achievement", "Fun"]
    },
    {
        name: "Wonder Woman",
        type: "character",
        description: "Fight for those who cannot fight for themselves. Lead with compassion, truth, and unwavering courage.",
        values: ["Fairness", "Courage", "Empathy", "Honesty", "Love"]
    }
];
```

---

## 4. Matching + rendering functions — paste before `setupResultsScreen`

```js
function findKindredMatches(userValueNames) {
    const matches = kindredProfiles.map(profile => {
        const matchingValues = profile.values.filter(v => userValueNames.includes(v));
        return {
            ...profile,
            matchCount: matchingValues.length,
            matchingValues: matchingValues
        };
    });

    matches.sort((a, b) => b.matchCount - a.matchCount);

    const topMatches = [];
    const philosophies = matches.filter(m => m.type === 'philosophy' && m.matchCount > 0);
    const characters = matches.filter(m => m.type === 'character' && m.matchCount > 0);

    if (philosophies.length > 0) topMatches.push(philosophies[0]);
    if (characters.length > 0) topMatches.push(characters[0]);

    if (topMatches.length < 2) {
        const remaining = matches.filter(m => !topMatches.includes(m) && m.matchCount > 0);
        if (remaining.length > 0) topMatches.push(remaining[0]);
    }

    return topMatches.slice(0, 2);
}

function renderKindredSpirits(userValueNames) {
    const container = document.getElementById('kindred-matches');
    const matches = findKindredMatches(userValueNames);

    if (matches.length === 0) {
        document.getElementById('kindred-section').style.display = 'none';
        return;
    }

    container.innerHTML = matches.map(match => `
        <div class="kindred-card ${match.type}">
            <div class="kindred-header">
                <span class="kindred-name">${match.name}</span>
                <span class="kindred-type">${match.type === 'philosophy' ? 'Philosophy' : 'Character'}</span>
            </div>
            <p class="kindred-description">${match.description}</p>
            <div class="kindred-values">
                ${match.values.map(v => `
                    <span class="kindred-value ${match.matchingValues.includes(v) ? 'match' : ''}">${v}</span>
                `).join('')}
            </div>
        </div>
    `).join('');
}
```

Then add to `setupResultsScreen`:

```js
renderKindredSpirits(userValueNames);
```

---

## 5. Canvas share-image section — paste inside `shareAsImage`, after the per-value loop

Also add this line near the top of `shareAsImage`:

```js
const kindredMatches = findKindredMatches(userValueNames);
```

Then the canvas rendering:

```js
if (kindredMatches.length > 0) {
    y += 20;

    ctx.fillStyle = '#3D2C29';
    ctx.font = 'bold 36px Fraunces, Georgia, serif';
    ctx.fillText('Kindred Spirits', width / 2, y);
    y += 50;

    kindredMatches.forEach((match, i) => {
        const cardX = 80;
        const cardWidth = width - 160;
        const cardHeight = 180;

        ctx.fillStyle = 'white';
        roundRect(ctx, cardX, y, cardWidth, cardHeight, 16);
        ctx.fill();

        ctx.fillStyle = match.type === 'philosophy' ? '#81B29A' : '#F4A261';
        ctx.fillRect(cardX, y, 6, cardHeight);

        ctx.fillStyle = '#3D2C29';
        ctx.font = 'bold 28px DM Sans, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(match.name, cardX + 24, y + 40);

        const typeText = match.type === 'philosophy' ? 'Philosophy' : 'Character';
        ctx.font = '18px DM Sans, sans-serif';
        const badgeWidth = ctx.measureText(typeText).width + 20;
        ctx.fillStyle = match.type === 'philosophy' ? '#E8F5E9' : '#FFF3E0';
        roundRect(ctx, cardX + cardWidth - badgeWidth - 24, y + 20, badgeWidth, 30, 4);
        ctx.fill();
        ctx.fillStyle = match.type === 'philosophy' ? '#2E7D32' : '#E65100';
        ctx.fillText(typeText, cardX + cardWidth - badgeWidth - 14, y + 40);

        ctx.fillStyle = '#666666';
        ctx.font = '22px DM Sans, sans-serif';
        ctx.textAlign = 'left';
        const descWords = match.description.split(' ');
        let descLine = '';
        let descY = y + 75;
        const descMaxWidth = cardWidth - 48;

        descWords.forEach((word, j) => {
            const testLine = descLine + word + ' ';
            const metrics = ctx.measureText(testLine);
            if (metrics.width > descMaxWidth && j > 0) {
                ctx.fillText(descLine.trim(), cardX + 24, descY);
                descLine = word + ' ';
                descY += 28;
            } else {
                descLine = testLine;
            }
        });
        ctx.fillText(descLine.trim(), cardX + 24, descY);

        let pillX = cardX + 24;
        const pillY = y + cardHeight - 40;
        ctx.font = '16px DM Sans, sans-serif';

        match.matchingValues.forEach(v => {
            const vWidth = ctx.measureText(v).width + 20;
            ctx.fillStyle = '#E07A5F';
            roundRect(ctx, pillX, pillY - 20, vWidth, 28, 14);
            ctx.fill();
            ctx.fillStyle = 'white';
            ctx.fillText(v, pillX + 10, pillY);
            pillX += vWidth + 8;
        });

        ctx.textAlign = 'center';
        y += cardHeight + 20;
    });
}
```
