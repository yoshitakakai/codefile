<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>お問い合わせフォーム</title>
    <style>
        form ul li {
            list-style: none;
        }
    </style>
</head>
<body>
    <h2>お問い合わせフォーム</h2>
    <form action="send_mail.php" method="post">
        <ul>
            <li><label>名前: <input type="text" name="name" required></label></li>
            <li><label>メールアドレス: <input type="email" name="email" required></label></li>

        <!-- ✅ チェックボックス（複数選択可） -->
        <fieldset>
            <legend>お問い合わせ内容（複数選択可）:</legend>
            <ul>
                <li><input type="checkbox" name="inquiry[]" value="サービスについて" id="service"><label for="service">サービスについて</label></li>
                <li><input type="checkbox" name="inquiry[]" value="料金について" id="cost"><label for="cost">料金について</label></li>
                <li><input type="checkbox" name="inquiry[]" value="サポートについて" id="support"><label for="support">サポートについて</label></li>
                <li><input type="checkbox" name="inquiry[]" value="その他" id="etc"><label for="etc">その他</label></li>
            </ul>
        </fieldset>

        <!-- ✅ ラジオボタン（1つのみ選択） -->
        <fieldset>
            <legend>希望する対応方法（1つ選択）:</legend>
            <input type="radio" name="response" value="メール" id="email" required>
            <label for="email">メール</label>

            <input type="radio" name="response" value="電話" id="phone">
            <label for="phone">電話</label>

            <input type="radio" name="response" value="不要" id="none">
            <label for="none">連絡不要</label>
        </fieldset>

        <!-- ✅ セレクトボックス（1つのみ選択） -->
        <label>年代:
            <select name="age">
                <option value="10代">10代</option>
                <option value="20代">20代</option>
                <option value="30代">30代</option>
                <option value="40代">40代</option>
                <option value="50代">50代</option>
                <option value="60代以上">60代以上</option>
            </select>
        </label>

        <label>メッセージ:<br>
            <textarea name="message" rows="5" required></textarea>
        </label>

        <button type="submit">送信</button>
    </form>
</body>
</html>
