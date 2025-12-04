const admin = require("firebase-admin");
const serviceAccount = {
    "type": "service_account",
    "project_id": "campuspulse-55f8d",
    "private_key_id": "2d6215f35663b2c6458615005c7c2dba73903030",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDCujM14pWJtZ08\nPI5JVSFfRpxRZWgiTDKupQmzaBfe3a7aX3qBMh5RXNoYZELNQN1bTO4M63LI1ZMt\nuOZrTcwHU3lt6AyxM+ODZkt9xgkH3t1Uy5rGWpdd+pmc4RU00sX2cDjA40toAtuk\nVypAbg/lBhNAIU4tjpMC/+r6cK0E35AYQ0Yp/LB5Ylef67hKjgzr7zdIV7s1mYpd\nqWiyfLCnuQ6pJygEoCEa08RIx0CKil958CuDEpXtVkvv6qv64joGvQ5dhkFquykv\n2p7sCNKghJLomnqjka+vvPUXBYO0L4BFLA0E40p/W4gKxcRQ4b3eJlRadvmhON3S\n80rx3YOPAgMBAAECggEAAwFjs/O00iTK8fiPS6N0Oee5luoFQu5BI//pF+tF3ws1\n3Sn3FpJi9GeF+DVn8IoNQJD95ZYmteHR/TUq3UIcoYpQx/j6ZSvDWa5VAPJzBjuS\n1/GyiFgymOE6yLiSnreYFZci0RtQ+SB+KlmsDcWFGkhPOMCq17opG7U+d7IQgZA4\n2G8+meVhiBlw8mY5llpBdl+MiZG7eSgYfUT+gzh63HKSKzwNURYaQWhWQWVQ+XH5\n0qtmf6Af1Vnze6TZgm+CCifVjBpMiyY/iHNlMy5Yuz74j0nup9uwmpKodUNrfZ7+\nhDtOQJRlmdRXIPVyBpxukZnM8vTOuNpfgLZMnPWu7QKBgQD2vMSjMxLhf9+xCs7R\nhlv1VDInPoZ2rIY8mW+Keh7A7ERq9S5aJ9/rStLAFSKHjdZ2ikNGJOCm8D9XeK1d\n3/YKH5Nr9TyqhI6zuhYAItT+1QH79gsTuodzoARv11NP1gWSZm6ILehN11ivpVsy\nFte5h4LtLaylyZSXup6MZhoClQKBgQDKCZjy57uC7R2oA8vKJc0oAsrg7wxadK8r\ngctStqkVVZqzMNDNkv7jzxhCZyEFu8xD4pWyHFxWIPTUbQgeEpD0YrPFGLrPWeNl\ndw04AyXt916zOlAkx8w8wRH61Cn55mSccdSN2nxlgS0/lLmqYelSqU4ZaVcgbK/z\n0cToPXvokwKBgDzZ81kYiIiKw/1i3/z2uQk5OaFKH1l3VSfu435wfdMwsfL7AvKD\nMQtTicSLsddimMjlcpADGlCxob2N6pvjV0fJ387ZTZv0U0lqFHD2JjevCu08EiFM\neImApnd60HY5H2iq0InPYKKKALpY+rPQxGViUVzzTcgZfgcppF6V88Y9AoGATzsm\nTRQNmBGvEKW0dKkQZIF72GxGtu6Nh41WFDDn7CLvERiyufvMk8AyblANRjdYqsKg\nHAI9P9WazfeYOFrll8FhaIkDMa+5mp/uginR5RmefMEAjvv/n0/D4k7zyznL+QI2\n7g5hvFjFSurjSOsu2ijlJNgHwAJ/mimIg98gyZsCgYEA9Dyry4EIt4J7LF8zsxAA\nHhc8dmaQ2IrdpdbEpeG6y6iak9wdeV0cFRd/ZNSafChlprwH63Q1FZoY2HCTKRGO\nLnfR/htsb2yRJJppza1xKS5quKslp0p2SGKQtk/cEfzHQ+5ZzIOMofwFc/whiDkP\nR9mRQI15uS/Q8+fzF/eeHsw=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-fbsvc@campuspulse-55f8d.iam.gserviceaccount.com",
    "client_id": "115675489737622544940",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40campuspulse-55f8d.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }
  ;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://campuspulse-55f8d.firebaseio.com",
});

module.exports = admin.firestore();