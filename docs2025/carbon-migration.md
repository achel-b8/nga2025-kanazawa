# Carbon Components 段階的削除計画

## 現状分析
- 現在のプロジェクトにはCarbon Componentsの依存関係は存在しない
- `_archived/` フォルダに過去のCarbon Components使用の実装が保存されている
- 新しいプロジェクトは既にTailwind CSSベースでスタートしている

## 削除済み項目
✅ Carbon Components の依存関係（package.json）
✅ Carbon Components の import 文
✅ Carbon Components のコンポーネント使用

## 移行完了状況
- **Header.svelte**: Tailwind CSS版を新規作成予定
- **Footer.svelte**: Tailwind CSS版を新規作成予定  
- **StoreCard.svelte**: Tailwind CSS版を新規作成予定
- **BusinessTimeCell.svelte**: Tailwind CSS版を新規作成予定
- **SnsUrls.svelte**: Tailwind CSS版を新規作成予定

## 参考実装
`_archived/` フォルダの実装を参考に、以下のコンポーネントをTailwind CSSで再実装:

1. **Layout Components**
   - Header.svelte (ナビゲーション、アクセシビリティ)
   - Footer.svelte (年度リンク、SNS)

2. **UI Components**  
   - StoreCard.svelte (店舗カード表示)
   - BusinessTimeCell.svelte (営業時間表示)
   - SnsUrls.svelte (SNSリンク)

3. **Page Components**
   - TopStoreList.svelte (店舗一覧)

## 移行原則
- Carbon Componentsの機能を100%踏襲
- アクセシビリティ要件の維持・向上
- パフォーマンスの改善
- Tailwind CSS のベストプラクティス採用

## 完了条件
- すべてのCarbon Components依存を削除
- 同等機能のTailwind CSS実装完成
- アクセシビリティテスト通過
- デザインシステム統一