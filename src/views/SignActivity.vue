<template>
  <div>
    <!-- 使用通用签名组件 -->
    <base-electronic-signer mode="element" :file-name="fileName" download
      @submit="onSignSubmit" :visible-date="true">
      <template #element>
        <div
          style="font-family: 'SimSun', 'Arial', sans-serif; color: #333; line-height: 2; font-size: 15px;padding: 15px;">
          <h2 style="text-align: center; font-size: 24px; font-weight: bold; margin-bottom: 40px; letter-spacing: 2px;">
            解除劳动合同协议书</h2>

          <p><strong>甲方（用人单位）：</strong>XXXXXXXXXXXXXXXX公司</p>
          <p><strong>法定代表人：</strong>张三</p>
          <p><strong>注册地址：</strong>北京市海淀区XX路XX号</p>
          <br />
          <p><strong>乙方（劳动者）：</strong>{{ userInfo.name || '张三' }}</p>
          <p><strong>身份证号码：</strong>11010119900101XXXX</p>
          <p><strong>联系电话：</strong>1380000XXXX</p>

          <hr style="border: none; border-top: 1px solid #dcdfe6; margin: 30px 0;" />

          <p style="text-indent: 2em; margin-bottom: 15px;">甲、乙双方于 ______ 年 ____ 月 ____ 日签订了无固定期限/固定期限劳动合同，合同期限至 ______
            年
            ____ 月 ____ 日止。现因双方业务调整及个人职业规划原因，经甲、乙双方协商一致，决定提前解除劳动合同关系。为明确双方的权利与义务，特订立本协议，以资共同遵守。</p>

          <h3 style="font-size: 16px; font-weight: bold; margin-top: 30px;">第一条 劳动合同解除时间及离职手续</h3>
          <p style="text-indent: 2em;">1. 甲乙双方一致同意，自 ______ 年 ____ 月 ____
            日起正式解除双方的劳动合同关系。自解除之日起，双方劳动关系消灭，彼此之间不再享有劳动法规定的权利，亦不再承担劳动法规定的义务。</p>
          <p style="text-indent: 2em;">2. 乙方应当在本协议签署之日起 ______
            个工作日内，按照甲方有关离职流程办理完毕全部交接手续。交接内容包括但不限于：工作业务交接、文档资料、办公用品（个人电脑、门禁卡、钥匙等）、公司系统账号权限注销等。</p>
          <p style="text-indent: 2em;">3. 乙方应确保所交接的所有技术资料、商业秘密文件的完整性，不得私自复制、带走或向任何第三方泄露。</p>

          <h3 style="font-size: 16px; font-weight: bold; margin-top: 30px;">第二条 经济补偿金及薪酬结算</h3>
          <p style="text-indent: 2em;">1. 经双方协商一致，甲方同意就提前解除劳动合同向乙方支付经济补偿金、代通知金以及各类补贴。上述费用合并共计人民币：___________
            元（大写：___________________________）。</p>
          <p style="text-indent: 2em;">2. 甲方将于乙方按照本协议第一条规定完全办理完毕离职交接手续，且经甲方各部门签字确认后的 ______
            个工作日内，将上述款项一次性以银行转账形式支付至乙方的工资账户。</p>
          <p style="text-indent: 2em;">3. 乙方截至劳动合同解除当日的薪资、年假折算工资、加班费等，甲方已在 ______ 月份工资中足额结算，乙方对此无任何异议。</p>

          <!-- 【测试提示】这里是第一页和第二页的分界线区域附近 -->
          <h3 style="font-size: 16px; font-weight: bold; margin-top: 30px;">第三条 社会保险及公积金</h3>
          <p style="text-indent: 2em;">1. 甲方负责为乙方缴纳社会保险（养老、医疗、失业、工伤、生育保险）及住房公积金至 ______ 年 ____ 月止。自 ______ 年 ____
            月起，由于劳动关系解除，甲方不再承担为乙方缴纳社会保险和公积金的义务，由乙方自行负责解决。</p>
          <p style="text-indent: 2em;">2. 离职手续办理完毕后，甲方应依法为乙方出具离职证明，并配合办理社会保险和公积金的转移或停缴手续。</p>

          <h3 style="font-size: 16px; font-weight: bold; margin-top: 30px;">第四条 保密义务及竞业限制规定</h3>
          <p style="text-indent: 2em;">1.
            乙方承认知悉甲方的商业秘密、技术秘密及客户资源对甲方至关重要。不论因何种原因离职，乙方均应对在职期间知悉的甲方商业秘密（包括但不限于源代码、设计文档、客户名单、财务数据等）承担严格的保密义务，不得在离职后以任何形式传播、使用或许可他人使用。
          </p>
          <p style="text-indent: 2em;">2.
            双方确认，乙方离职后是否启动竞业限制条款，以甲方单独出具的《竞业限制启动/免除通知书》为准。若甲方启动竞业限制，乙方应严格遵守不得到与甲方有竞争关系的单位任职的义务，甲方将依法按月支付竞业限制补偿金。</p>

          <h3 style="font-size: 16px; font-weight: bold; margin-top: 30px;">第五条 双方承诺与无涉诉声明</h3>
          <p style="text-indent: 2em;">1. 乙方确认：自收到本协议第二条规定的全部款项后，双方之间基于劳动关系、劳动合同引发的所有经济关系已完全结清。乙方在甲方在职期间的合法权益已得到充分保障。
          </p>
          <p style="text-indent: 2em;">2.
            本协议生效后，双方均承诺不再就劳动合同的履行、解除及在职期间的薪资、福利、加班、社保、税收、假期、年终奖等任何事宜，向劳动争议仲裁委员会提起仲裁，或向人民法院提起诉讼，亦不会通过任何形式进行劳动维权投诉。</p>
          <p style="text-indent: 2em;">3. 任何一方若违反本条承诺，导致对方产生诉讼费、律师费、差旅费等损失的，违约方应承担全部赔偿责任。</p>

          <h3 style="font-size: 16px; font-weight: bold; margin-top: 30px;">第六条 其他约定事项</h3>
          <p style="text-indent: 2em;">1. 本协议为甲乙双方自愿、平等协商的结果，不存在欺诈、胁迫或乘人之危的情形，是双方真实意思的表示。</p>
          <p style="text-indent: 2em;">2. 本协议一式两份，甲乙双方各执一份，具有同等法律效力。本协议自双方签字、盖章之日起生效。</p>
          <p style="text-indent: 2em;">3. 因履行本协议发生争议的，双方应友好协商解决；协商不成的，任何一方均有权向甲方所在地有管辖权的人民法院提起诉讼。</p>

          <!-- 【故意撑高度的留白块】下面这一块专门用来把签名落款强行挤到第3页，用于极限测试多页渲染 -->
          <div
            style="height: 450px; border-left: 2px dashed #e6a23c; margin: 40px 0; padding-left: 15px; color: #e6a23c; font-size: 13px; background: #fdf6ec;">
            <p style="margin: 0; line-height: 1.5;"><strong>[ 开发测试专用补充页标识 ]</strong></p>
            <p style="margin: 5px 0 0 0; line-height: 1.5;">此处利用大范围的 margin 和空白块，强行将协议正文拉长，以确保合同整体排版和高度能够完全突破两页 A4
              纸（2246
              像素）。请在此处测试签名图片跨页拖拽、防溢出边界检测，并观察前端 html2canvas 分页截取时是否会出现“文字被拦腰斩断”或“签章漂移”的现象。</p>
          </div>

          <!-- 底部预留的基础落款区文字引导 -->
          <div style="margin-top: 60px; color: #909399; font-size: 13px; text-align: center;">
            --- 以下无正文，请签署人确认无误后在规定区域内拖拽完成签名落款 ---
          </div>
        </div>
      </template>
    </base-electronic-signer>
  </div>
</template>

<script>
import BaseElectronicSigner from '../components/BaseElectronicSignerComponents.vue';
export default {
  components: { BaseElectronicSigner },
  data() {
    return {
      fileName: '解除劳动合同协议书',
      // 场景一：直接签后台富文本 HTML
      contractMode: 'html',
      userInfo: {},
      contractContent: `<div style="font-family: 'SimSun', 'Arial', sans-serif; color: #333; line-height: 2; font-size: 15px;">
    <h2 style="text-align: center; font-size: 24px; font-weight: bold; margin-bottom: 40px; letter-spacing: 2px;">解除劳动合同协议书</h2>
    
    <p><strong>甲方（用人单位）：</strong>XXXXXXXXXXXXXXXX公司</p>
    <p><strong>法定代表人：</strong>张三</p>
    <p><strong>注册地址：</strong>北京市海淀区XX路XX号</p>
    <br/>
    <p><strong>乙方（劳动者）：</strong>{{ userInfo.name || '张三' }}</p>
    <p><strong>身份证号码：</strong>11010119900101XXXX</p>
    <p><strong>联系电话：</strong>1380000XXXX</p>
    
    <hr style="border: none; border-top: 1px solid #dcdfe6; margin: 30px 0;" />

    <p style="text-indent: 2em; margin-bottom: 15px;">甲、乙双方于 ______ 年 ____ 月 ____ 日签订了无固定期限/固定期限劳动合同，合同期限至 ______ 年 ____ 月 ____ 日止。现因双方业务调整及个人职业规划原因，经甲、乙双方协商一致，决定提前解除劳动合同关系。为明确双方的权利与义务，特订立本协议，以资共同遵守。</p>

    <h3 style="font-size: 16px; font-weight: bold; margin-top: 30px;">第一条 劳动合同解除时间及离职手续</h3>
    <p style="text-indent: 2em;">1. 甲乙双方一致同意，自 ______ 年 ____ 月 ____ 日起正式解除双方的劳动合同关系。自解除之日起，双方劳动关系消灭，彼此之间不再享有劳动法规定的权利，亦不再承担劳动法规定的义务。</p>
    <p style="text-indent: 2em;">2. 乙方应当在本协议签署之日起 ______ 个工作日内，按照甲方有关离职流程办理完毕全部交接手续。交接内容包括但不限于：工作业务交接、文档资料、办公用品（个人电脑、门禁卡、钥匙等）、公司系统账号权限注销等。</p>
    <p style="text-indent: 2em;">3. 乙方应确保所交接的所有技术资料、商业秘密文件的完整性，不得私自复制、带走或向任何第三方泄露。</p>

    <h3 style="font-size: 16px; font-weight: bold; margin-top: 30px;">第二条 经济补偿金及薪酬结算</h3>
    <p style="text-indent: 2em;">1. 经双方协商一致，甲方同意就提前解除劳动合同向乙方支付经济补偿金、代通知金以及各类补贴。上述费用合并共计人民币：___________ 元（大写：___________________________）。</p>
    <p style="text-indent: 2em;">2. 甲方将于乙方按照本协议第一条规定完全办理完毕离职交接手续，且经甲方各部门签字确认后的 ______ 个工作日内，将上述款项一次性以银行转账形式支付至乙方的工资账户。</p>
    <p style="text-indent: 2em;">3. 乙方截至劳动合同解除当日的薪资、年假折算工资、加班费等，甲方已在 ______ 月份工资中足额结算，乙方对此无任何异议。</p>

    <!-- 【测试提示】这里是第一页和第二页的分界线区域附近 -->
    <h3 style="font-size: 16px; font-weight: bold; margin-top: 30px;">第三条 社会保险及公积金</h3>
    <p style="text-indent: 2em;">1. 甲方负责为乙方缴纳社会保险（养老、医疗、失业、工伤、生育保险）及住房公积金至 ______ 年 ____ 月止。自 ______ 年 ____ 月起，由于劳动关系解除，甲方不再承担为乙方缴纳社会保险和公积金的义务，由乙方自行负责解决。</p>
    <p style="text-indent: 2em;">2. 离职手续办理完毕后，甲方应依法为乙方出具离职证明，并配合办理社会保险和公积金的转移或停缴手续。</p>

    <h3 style="font-size: 16px; font-weight: bold; margin-top: 30px;">第四条 保密义务及竞业限制规定</h3>
    <p style="text-indent: 2em;">1. 乙方承认知悉甲方的商业秘密、技术秘密及客户资源对甲方至关重要。不论因何种原因离职，乙方均应对在职期间知悉的甲方商业秘密（包括但不限于源代码、设计文档、客户名单、财务数据等）承担严格的保密义务，不得在离职后以任何形式传播、使用或许可他人使用。</p>
    <p style="text-indent: 2em;">2. 双方确认，乙方离职后是否启动竞业限制条款，以甲方单独出具的《竞业限制启动/免除通知书》为准。若甲方启动竞业限制，乙方应严格遵守不得到与甲方有竞争关系的单位任职的义务，甲方将依法按月支付竞业限制补偿金。</p>

    <h3 style="font-size: 16px; font-weight: bold; margin-top: 30px;">第五条 双方承诺与无涉诉声明</h3>
    <p style="text-indent: 2em;">1. 乙方确认：自收到本协议第二条规定的全部款项后，双方之间基于劳动关系、劳动合同引发的所有经济关系已完全结清。乙方在甲方在职期间的合法权益已得到充分保障。</p>
    <p style="text-indent: 2em;">2. 本协议生效后，双方均承诺不再就劳动合同的履行、解除及在职期间的薪资、福利、加班、社保、税收、假期、年终奖等任何事宜，向劳动争议仲裁委员会提起仲裁，或向人民法院提起诉讼，亦不会通过任何形式进行劳动维权投诉。</p>
    <p style="text-indent: 2em;">3. 任何一方若违反本条承诺，导致对方产生诉讼费、律师费、差旅费等损失的，违约方应承担全部赔偿责任。</p>

    <h3 style="font-size: 16px; font-weight: bold; margin-top: 30px;">第六条 其他约定事项</h3>
    <p style="text-indent: 2em;">1. 本协议为甲乙双方自愿、平等协商的结果，不存在欺诈、胁迫或乘人之危的情形，是双方真实意思的表示。</p>
    <p style="text-indent: 2em;">2. 本协议一式两份，甲乙双方各执一份，具有同等法律效力。本协议自双方签字、盖章之日起生效。</p>
    <p style="text-indent: 2em;">3. 因履行本协议发生争议的，双方应友好协商解决；协商不成的，任何一方均有权向甲方所在地有管辖权的人民法院提起诉讼。</p>

    <!-- 【故意撑高度的留白块】下面这一块专门用来把签名落款强行挤到第3页，用于极限测试多页渲染 -->
    <div style="height: 450px; border-left: 2px dashed #e6a23c; margin: 40px 0; padding-left: 15px; color: #e6a23c; font-size: 13px; background: #fdf6ec;">
      <p style="margin: 0; line-height: 1.5;"><strong>[ 开发测试专用补充页标识 ]</strong></p>
      <p style="margin: 5px 0 0 0; line-height: 1.5;">此处利用大范围的 margin 和空白块，强行将协议正文拉长，以确保合同整体排版和高度能够完全突破两页 A4 纸（2246 像素）。请在此处测试签名图片跨页拖拽、防溢出边界检测，并观察前端 html2canvas 分页截取时是否会出现“文字被拦腰斩断”或“签章漂移”的现象。</p>
    </div>

    <!-- 底部预留的基础落款区文字引导 -->
    <div style="margin-top: 60px; color: #909399; font-size: 13px; text-align: center;">
      --- 以下无正文，请签署人确认无误后在规定区域内拖拽完成签名落款 ---
    </div>
  </div>
`,

      // 场景二：如果改成签 PDF 附件，直接切换这两个字段即可
      // contractMode: 'pdf',
      // contractContent: 'https://qn.dazuhang.com/解除劳动合同协议书.pdf' 
    };
  },
  methods: {
    onSignSubmit(signData) {
      console.log('拿到了全套签名数据:', signData);
    }
  }
};
</script>