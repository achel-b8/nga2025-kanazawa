<script lang="ts">
  import { CURRENT_YEAR, SUPPORTED_YEARS } from '../../types/constants.js';

  // 過年度リンクの生成
  const pastYears = SUPPORTED_YEARS.filter(year => year !== CURRENT_YEAR).sort((a, b) => b - a);
</script>

<footer>
  <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
    <div class="xl:grid xl:grid-cols-3 xl:gap-8">
      <!-- 左カラム：イベント情報 -->
      <div class="space-y-8 xl:col-span-1">
        <div>
          <h3 class="text-lg font-semibold text-gray-900">
            日本酒ゴーアラウンド金沢{CURRENT_YEAR}
          </h3>
          <p class="mt-4 text-base text-gray-600">
            金沢の日本酒と美食を巡る年に一度のイベント。参加店舗で厳選された石川県産の日本酒と料理をお楽しみください。
          </p>
        </div>

        <!-- SNSリンク -->
        <div class="flex space-x-6">
          <a
            href="https://www.instagram.com/nga_kanazawa/"
            class="text-gray-400 hover:text-gray-500  rounded-md p-1 transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagramを新しいタブで開く"
          >
            <span class="sr-only">Instagram</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M12.017 0C8.396 0 7.999.01 6.84.048 5.69.087 4.948.222 4.29.42a7.233 7.233 0 0 0-2.612 1.772 7.229 7.229 0 0 0-1.772 2.612C-.08 5.462-.215 6.204-.254 7.354-.292 8.513-.302 8.91-.302 12.531c0 3.628.01 4.025.048 5.184.039 1.149.174 1.891.372 2.548a7.238 7.238 0 0 0 1.772 2.613 7.233 7.233 0 0 0 2.612 1.772c.657.198 1.399.333 2.548.372 1.159.038 1.556.048 5.184.048 3.628 0 4.025-.010 5.184-.048 1.149-.039 1.891-.174 2.548-.372a7.233 7.233 0 0 0 2.613-1.772 7.229 7.229 0 0 0 1.772-2.613c.198-.657.333-1.399.372-2.548.038-1.159.048-1.556.048-5.184 0-3.628-.010-4.025-.048-5.184-.039-1.149-.174-1.891-.372-2.548a7.229 7.229 0 0 0-1.772-2.612A7.233 7.233 0 0 0 19.394.42c-.657-.198-1.399-.333-2.548-.372C15.687.01 15.29 0 11.669 0h.348zm-.081 1.802h.332c3.585 0 4.009.01 5.126.048 1.014.037 1.565.171 1.933.284.485.189.832.414 1.198.781.366.366.592.713.781 1.198.113.368.247.919.284 1.933.038 1.117.047 1.541.047 5.126 0 3.585-.009 4.009-.047 5.126-.037 1.014-.171 1.565-.284 1.933-.189.485-.415.832-.781 1.198-.366.366-.713.592-1.198.781-.368.113-.919.247-1.933.284-1.117.038-1.541.047-5.126.047-3.585 0-4.009-.009-5.126-.047-1.014-.037-1.565-.171-1.933-.284a3.2 3.2 0 0 1-1.198-.781 3.2 3.2 0 0 1-.781-1.198c-.113-.368-.247-.919-.284-1.933-.038-1.117-.047-1.541-.047-5.126 0-3.585.009-4.009.047-5.126.037-1.014.171-1.565.284-1.933.189-.485.415-.832.781-1.198.366-.366.713-.592 1.198-.781.368-.113.919-.247 1.933-.284 1.117-.038 1.541-.047 5.126-.047zm0 3.197a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm0 11.531a4.531 4.531 0 1 1 0-9.062 4.531 4.531 0 0 1 0 9.062zm8.906-11.531a1.636 1.636 0 1 1-3.272 0 1.636 1.636 0 0 1 3.272 0z" clip-rule="evenodd" />
            </svg>
          </a>
        </div>
      </div>

      <!-- 中央・右カラム：ナビゲーションリンク -->
      <div class="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
        <!-- ナビゲーション -->
        <div class="md:grid md:grid-cols-2 md:gap-8">
          <div>
            <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              ナビゲーション
            </h3>
            <ul class="mt-4 space-y-4">
              <li>
                <a href="/" class="text-base text-gray-500 hover:text-gray-900  rounded-sm transition-colors duration-200">
                  ホーム
                </a>
              </li>
              <li>
                <a href="/stores" class="text-base text-gray-500 hover:text-gray-900  rounded-sm transition-colors duration-200">
                  参加店舗
                </a>
              </li>
            </ul>
          </div>
          <div class="mt-12 md:mt-0">
            <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              外部リンク
            </h3>
            <ul class="mt-4 space-y-4">
              <li>
                <a
                  href="https://www.google.com/maps/d/u/0/edit?mid=1joCBNB-GcvvTJJpD2udXGEYvIMMQWW0&usp=sharing"
                  class="text-base text-gray-500 hover:text-gray-900  rounded-sm transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Googleマイマップ
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/nga_kanazawa/"
                  class="text-base text-gray-500 hover:text-gray-900  rounded-sm transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- 過年度 -->
        <div class="md:grid md:grid-cols-1">
          <div>
            <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              過年度開催
            </h3>
            <ul class="mt-4 space-y-4">
              {#each pastYears as year}
                <li>
                  <a
                    href="/{year}/stores"
                    class="text-base text-gray-500 hover:text-gray-900  rounded-sm transition-colors duration-200"
                  >
                    {year}年参加店舗
                  </a>
                </li>
              {/each}
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- ボーダーライン -->
    <div class="mt-12 pt-8">
      <div class="md:flex md:items-center md:justify-between">
        <!-- 左側：コピーライト -->
        <div class="flex items-center space-x-6 md:order-2">
          <p class="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} 日本酒ゴーアラウンド金沢. All rights reserved.
          </p>
        </div>

        <!-- 右側：免責事項等のリンク -->
        <div class="mt-8 md:mt-0 md:order-1">
          <div class="flex space-x-6">
            <p class="text-xs text-gray-400">
              店舗情報は変更される場合があります。最新情報は各店舗にお問い合わせください。
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>