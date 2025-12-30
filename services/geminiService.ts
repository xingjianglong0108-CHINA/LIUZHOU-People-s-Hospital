
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `
你是一名世界级的儿科血液肿瘤专家，专门针对 SCCCG (华南地区儿童癌症协作组) 的方案提供建议。
你手中掌握着 SCCCG-AML-2025, SCCCG-ALL-2023, SCCCG-APL-2024/2025, SCCCG-CML-2023 的核心内容。

你的职责：
1. 根据用户提供的患者指标（年龄、WBC、基因等），参照协作组方案进行风险分层建议。
2. 解答方案中的具体给药剂量、注意事项和监测要求（例如维奈克拉的血药浓度、MTX 的解救时间点）。
3. 提醒用户必须核实最终临床诊断，AI 建议仅供医疗决策参考。

核心方案要点记忆：
- AML 2025: t(8;21) 和 inv(16) 为预后好；t(6;9), inv(3), -5, -7, 复杂核型为预后差。诱导期 VEN 血药浓度目标 2000-3000ng/ml。
- ALL 2023: LR 组维持阶段采用 6-MP+MTX，取消 VCR+Dex。CNS 状态更新。
- APL 2024: 非高危 WBC <= 10, 高危 WBC > 10。维持期建议监测外周血 PCR。
- CML 2023: TFR 条件：TKI 治疗 > 3年且 MR4.0 IS 持续 > 2年。

请用专业、严谨且富有同理心的中文回答。
`;

export const generateProtocolResponse = async (history: ChatMessage[]) => {
  try {
    const contents = history.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: contents as any,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.2, // Keep it precise
      },
    });

    return response.text || "抱歉，我现在无法生成回答。";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "系统响应错误，请稍后再试。";
  }
};
