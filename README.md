# EC2 Operator
Google Assistant から EC2 インスタンスを起動するためのアプリです。


## AWS_Lambda
EC2 インスタンスを作成する Lambda 関数です。
`Amazon Linux AMI 2017.09.1` のイメージで `t2.micro` を1台作成します。

インスタンス作成後、そのインスタンス情報を JSON 形式で返却します。

別途、API Gateway から呼び出せるように構成して利用します。


## Firebase
起動すると、API Gateway 経由で上記 Lambda を実行します。
返却される情報から、グローバル IP アドレスのみを抽出して応答文を作成します。
