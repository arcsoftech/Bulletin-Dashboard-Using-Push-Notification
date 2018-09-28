module.exports = Subscriptions => {
    return {
        POST: {
            subscriptionHandler: (req, res) => {
                //Checking connection status
                console.log(req.body);
                let data = {
                    Subid: req.body.id
                };
                Subscriptions.create(data)
                    .then((subscriptionRow, created) => {
                        console.log(subscriptionRow);
                        res.send("Subcription recorded succesfully")
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(422).send(err.message)
                    });
            }
        }
    }
}