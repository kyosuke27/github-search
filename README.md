# GitHub User Info

GitHubのユーザー名を入力し、GitHub APIからユーザー情報やリポジトリ一覧を取得して表示する、ブラウザ向けの小さなJavaScriptアプリです。

## 現在の機能

- GitHubユーザー情報の取得
  - ユーザー名
  - アカウントのログイン名
  - アバター画像
  - 所在地
  - 公開リポジトリ数
- GitHubリポジトリ一覧の取得
  - リポジトリ名
  - 説明
  - リポジトリページへのリンク
- GitHub APIからエラーが返った場合のコンソール出力

画面上部の入力欄にGitHubユーザー名を入力し、「Get user info」でユーザー情報を、「Get user Repository」でリポジトリ一覧を取得します。結果は画面下部の結果表示領域に表示されます。

## 使用しているAPI

- `GET https://api.github.com/users/{userId}`
- `GET https://api.github.com/users/{userId}/repos`

## 起動方法

依存関係をインストールします。

```sh
pnpm install
```

プロジェクトルートでローカルサーバーを起動します。

```sh
pnpm exec js-primer-local-server .
```

表示されたローカルURLをブラウザで開いてください。`index.html` を直接開くのではなく、ローカルサーバー経由で実行します。

## ファイル構成

- `index.html`: 画面のHTML
- `index.js`: GitHub APIの呼び出しと画面表示処理
- `docs/spec.md`: アプリ全体の機能仕様
- `docs/ui-css-spec.md`: UIの見た目を整えるCSS仕様

## 仕様書

UIのCSS変更は、機能変更を含めない [docs/ui-css-spec.md](docs/ui-css-spec.md) に沿って行います。
