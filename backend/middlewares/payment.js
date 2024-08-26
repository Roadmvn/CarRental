// Ce middleware est un exemple. Dans une application réelle, vous devriez intégrer
// une vérification de paiement avec votre passerelle de paiement.

const verifyPayment = (req, res, next) => {
  const { paymentToken } = req.body;

  if (!paymentToken) {
    return res.status(400).json({ message: "Token de paiement manquant" });
  }

  // Ici, vous feriez normalement une vérification avec votre passerelle de paiement
  // Pour cet exemple, nous considérons que le paiement est valide si le token existe

  next();
};

module.exports = { verifyPayment };
