// iOS13対応のセンサーアクセス許可コード
// ジャイロセンサーが有効化どうかをDeviceOrientationEventで確認
if (window.DeviceOrientationEvent) {
  console.log(window.DeviceOrientationEvent);
  // iOS13向け：ユーザーにアクセスの許可を求める関数があるかで確認
  // DeviceOrientationEvent.requestPermissionオブジェクトについて調べる
  if (DeviceOrientationEvent.requestPermission) {
    // id = sensor_contents要素をsensor_contentsに代入
    var sensor_contents = document.getElementById("sensor_contents");
    // id = sensor_contentsがクリックされたら以下の関数が動く
    sensor_contents.addEventListener("click", function() {
      // ジャイロセンサーのアクセス許可をリクエストする
      DeviceOrientationEvent.requestPermission().then(function(response) {
        // リクエストが許可されたら
        if (response === "granted") {
          // DeviceOrientationが有効化されるので
          window.addEventListener("deviceorientation", deviceorientationHandler);
        }
      }).catch(function(e){
        console.log(e);
      });
    });
    // iOS13以外(DeviceOrientationEvent.requestPermission) === false

  } else {
    // 通常通りイベントハンドラを追加
    window.addEventListener("deviceorientation", deviceorientationHandler);
  }
}

  // ジャイロの値を入れる変数を3個用意
  var alpha = 0, beta = 0, gamma = 0;

  // ジャイロセンサの値が変化したら実行される
  // deviceorientationイベント
  function deviceorientationHandler(dat) {
  // window.addEventListener("deviceorientation", (dat) => {
    // z軸（表裏）まわりの回転の角度（反時計回りがプラス）
    alpha = dat.alpha;
    // x軸（左右）まわりの回転の角度（引き起こすとプラス）
    beta = dat.beta;
    // y軸（上下）まわりの回転の角度（右に傾けるとプラス）
    gamma = dat.gamma;
  };

  // 指定時間ごとに繰り返し実行される setInterval(実行する内容, 間隔[ms])タイマーを設定
  var timer = window.setInterval(() => {
    // displayData関数を実行
    displayData();
    // 33msごとに実行（1秒間に30回）
  }, 33);

  // データを表示するdisplayData関数
  function displayData() {
    // データを表示するdiv要素の取得
    var txt = document.getElementById("txt");
    txt.innerHTML = "alpha: " + alpha + "<br>" // x軸の値
                  + "beta: " + beta + "<br>" // y軸の値
                  + "gamma: " + gamma; // z軸の値
  }

  // コンパスのような絵を描く drawOrientation 関数
  function drawOrientation() {
    // 中心のx座標とy座標
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;
    // 枠園の半径と針の長さを定義
    var radius = 100;
    // 角度をラジアンに変換
    var radianAlpha = alpha * Math.PI / 180;
    // canvasの内容を消すclearRect(x, y, w, h)
    context.clearRect(0, 0, canvas.width, canvas.height);
    // ここから描画開始
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    context.strokeStyle = "rgb(0, 0, 0)";
    context.lineWidth = 2;
    context.stroke();
    context.moveTo(centerX, centerY);
    // 線を引く
    context.lineTo(centerX + Math.cos(radianAlpha - Math.PI / 2) * radius,
                   centerY + Math.sin(radianAlpha - Math.PI / 2) * radius);
    context.strokeStyle = "rgb(255, 0, 0)";
    context.lineWidth = 5;
    context.stroke();
  }
