# EC2 Operator
Google Assistant から EC2 インスタンスを起動するためのアプリです。

[![Youtube](http://img.youtube.com/vi/LggZFHPz7KM/0.jpg)](http://www.youtube.com/watch?v=LggZFHPz7KM)


## AWS_Lambda
EC2 インスタンスを作成する Lambda 関数です。
`Amazon Linux AMI 2017.09.1` のイメージで `t2.micro` を1台作成します。

インスタンス作成後、そのインスタンス情報を JSON 形式で返却します。

別途、API Gateway から呼び出せるように構成して利用します。


## Firebase
起動すると、API Gateway 経由で上記 Lambda を実行します。
返却される情報から、グローバル IP アドレスのみを抽出して応答文を作成します。


## 詳細記事
Google Home で新しいサーバを瞬時に作る - yuu26's memo
http://blog.yuu26.com/entry/20171210/1512894321