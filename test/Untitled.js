exports.updateCard = functions.https.onCall((data, context) => {
    const stripeId = data.stripeId;  // needed as users stripe ID
    const cardId = data.cardId;      // the current card they are updating, comes from the app
    const month = data.expmonth;    // this may or may not be blank
    const year = data.expyear;      // this may or may not be blank
    const newdefault = data.newdefault;  //this may or may not be blank

    return stripe.customers.updateSource(stripeId, cardId,
        {
            exp_month: month,  < --- how can I make sure this is not updated if month is blank ?
                exp_year : year < --- how can I make sure this is not updated if year is blank ?
        }
).then(() => {
    return stripe.customers.update(stripeId,
        {
            default_source: newdefault < --- how can I make sure this is not updated if newdefault is blank?
        }
    ).then(() => {
        console.log(card);
        return { myReturn: card };
    }).catch((err) => {
        console.log(err);
    });
});
});