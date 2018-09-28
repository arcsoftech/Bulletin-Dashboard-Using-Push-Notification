module.exports = Subscriptions => {
    return {
        GET: {},
        POST: {
            subscriptionHandler: (req, res) => {
                //Checking connection status
                let data = {
                    Subid: req.params.id
                };

                Subscriptions.create(data)
                .then((subscriptionRow, created) => {
                    console.log(subscriptionRow);
                    res.send(subscriptionRow)
                })
                .catch(err=>{console.log(err)});
            }
        }
    }
}
