/**
 * CLK 공유 목업 DB (localStorage 기반)
 * signup · admin · (향후) 로그인 흐름이 공유하는 가상 데이터 저장소.
 * 실서비스에서는 서버 DB + 세션으로 대체된다.
 */

export type Role = "VIEWER" | "GENERAL_MEMBER" | "MANAGER" | "ADMIN";
export type VerificationKind = "company" | "university" | "research";
export type VerificationStatus = "PENDING" | "APPROVED" | "REJECTED";

export type ClkUser = {
  email: string;
  name: string;
  memberType?: string;
  position?: string;
  orgName?: string;
  role: Role;
  verified: boolean;
  status: "ACTIVE";
};

export type VerificationDoc = { type: string; file: string };

export type Verification = {
  id: string;
  email: string;
  name: string;
  position: string;
  orgName: string;
  kind: VerificationKind;
  orgType: string;
  method: string;
  bizNum?: string;
  ceoName?: string;
  bizDate?: string;
  ntsStatus?: string;
  domainEmail?: string;
  homepage?: string;
  dept?: string;
  docs: VerificationDoc[];
  status: VerificationStatus;
  firstMember: boolean;
  requestedAt: string;
  grantedRole?: Role;
  reviewedBy?: string;
  reviewedAt?: string;
  rejectReason?: string;
};

export type AuditEntry = {
  ts: string;
  actor: string;
  action: "APPROVE" | "REJECT";
  target: string;
  note: string;
};

type ClkDB = {
  users: Record<string, ClkUser>;
  verifications: Verification[];
  audit: AuditEntry[];
};

const KEY = "clk_db_v2";

function seed(): ClkDB {
  return {
    users: {
      "demo@clkorea.ai": {
        email: "demo@clkorea.ai",
        name: "데모 사용자",
        memberType: "기업",
        position: "사업개발팀장",
        orgName: "삼성전자",
        role: "MANAGER",
        verified: true,
        status: "ACTIVE",
      },
    },
    verifications: [
      {
        id: "VR-1042",
        email: "kim@nanotech.co.kr",
        name: "김민지",
        position: "연구소장",
        orgName: "(주)나노테크솔루션",
        kind: "company",
        orgType: "기업",
        method: "기관 이메일 인증",
        bizNum: "215-87-00432",
        ceoName: "김대현",
        bizDate: "2015-03-01",
        ntsStatus: "계속사업자(정상)",
        docs: [{ type: "사업자등록증", file: "사업자등록증.pdf" }],
        status: "PENDING",
        firstMember: true,
        requestedAt: "2026-06-29 14:22",
      },
      {
        id: "VR-1041",
        email: "lee@postech.ac.kr",
        name: "이승현",
        position: "산학협력연구원",
        orgName: "포항공과대학교 신소재공학과",
        kind: "university",
        orgType: "대학",
        method: "도메인 이메일 인증",
        domainEmail: "lee@postech.ac.kr",
        docs: [{ type: "재직증명서", file: "재직증명서.pdf" }],
        status: "PENDING",
        firstMember: true,
        requestedAt: "2026-06-29 11:05",
      },
      {
        id: "VR-1039",
        email: "park@kims.re.kr",
        name: "박서연",
        position: "선임연구원",
        orgName: "한국재료연구원",
        kind: "research",
        orgType: "공공연구기관",
        method: "도메인 이메일 인증 + 재직확인서",
        domainEmail: "park@kims.re.kr",
        docs: [{ type: "재직확인서", file: "재직확인서.pdf" }],
        status: "PENDING",
        firstMember: false,
        requestedAt: "2026-06-28 16:48",
      },
      {
        id: "VR-1031",
        email: "jung@acetest.co.kr",
        name: "정승우",
        position: "대표이사",
        orgName: "(주)에이스시험연구소",
        kind: "company",
        orgType: "기업",
        method: "기관 이메일 인증",
        bizNum: "120-81-55667",
        ceoName: "정승우",
        bizDate: "2009-07-15",
        ntsStatus: "계속사업자(정상)",
        docs: [{ type: "사업자등록증", file: "사업자등록증.pdf" }],
        status: "APPROVED",
        grantedRole: "ADMIN",
        reviewedBy: "이운영(admin)",
        reviewedAt: "2026-06-27 10:12",
        firstMember: true,
        requestedAt: "2026-06-26 18:30",
      },
      {
        id: "VR-1028",
        email: "ghost@unknown.io",
        name: "미상",
        position: "-",
        orgName: "(주)정체불명",
        kind: "company",
        orgType: "기업",
        method: "기관 이메일 인증",
        bizNum: "888-88-88888",
        ceoName: "-",
        bizDate: "2024-01-01",
        ntsStatus: "휴업자",
        docs: [{ type: "사업자등록증", file: "사업자등록증.pdf" }],
        status: "REJECTED",
        rejectReason: "국세청 조회 결과 휴업 사업자 · 제출 서류 불일치",
        reviewedBy: "이운영(admin)",
        reviewedAt: "2026-06-26 09:40",
        firstMember: true,
        requestedAt: "2026-06-25 22:14",
      },
    ],
    audit: [
      {
        ts: "2026-06-27 10:12",
        actor: "이운영(admin)",
        action: "APPROVE",
        target: "VR-1031 · (주)에이스시험연구소",
        note: "역할 ADMIN 부여",
      },
      {
        ts: "2026-06-26 09:40",
        actor: "이운영(admin)",
        action: "REJECT",
        target: "VR-1028 · (주)정체불명",
        note: "휴업 사업자",
      },
    ],
  };
}

function load(): ClkDB {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ClkDB) : seed();
  } catch {
    return seed();
  }
}

function save(db: ClkDB) {
  try {
    localStorage.setItem(KEY, JSON.stringify(db));
  } catch {
    /* ignore quota errors */
  }
}

export function nowStr() {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

export const CLKDB = {
  get: load,
  save,
  reset: () => {
    try {
      localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
  },
  getUser: (email: string): ClkUser | null => load().users[email] || null,
  upsertUser: (u: Partial<ClkUser> & { email: string }): ClkUser => {
    const db = load();
    db.users[u.email] = { ...db.users[u.email], ...u } as ClkUser;
    save(db);
    return db.users[u.email];
  },
  addVerification: (v: Verification): Verification => {
    const db = load();
    db.verifications.unshift(v);
    save(db);
    return v;
  },
  listVerifications: (): Verification[] => load().verifications,
  listAudit: (): AuditEntry[] => load().audit,
  resolve: (
    id: string,
    status: "APPROVED" | "REJECTED",
    opts: { role?: Role; reason?: string; reviewer?: string; at?: string },
  ): Verification | null => {
    const db = load();
    const v = db.verifications.find((x) => x.id === id);
    if (!v) return null;
    v.status = status;
    v.reviewedBy = opts.reviewer || "이운영(admin)";
    v.reviewedAt = opts.at || nowStr();
    if (status === "APPROVED") {
      v.grantedRole = opts.role || "MANAGER";
      const u: ClkUser = db.users[v.email] || {
        email: v.email,
        name: v.name,
        position: v.position,
        memberType: v.orgType,
        role: "MANAGER",
        verified: true,
        status: "ACTIVE",
      };
      u.role = v.grantedRole;
      u.verified = true;
      u.orgName = v.orgName;
      db.users[v.email] = u;
    }
    if (status === "REJECTED") {
      v.rejectReason = opts.reason || "";
      const u2 = db.users[v.email];
      if (u2) {
        u2.verified = false;
        u2.role = "GENERAL_MEMBER";
      }
    }
    db.audit.unshift({
      ts: opts.at || nowStr(),
      actor: v.reviewedBy,
      action: status === "APPROVED" ? "APPROVE" : "REJECT",
      target: `${v.id} · ${v.orgName}`,
      note: status === "APPROVED" ? `역할 ${v.grantedRole} 부여` : opts.reason || "",
    });
    save(db);
    return v;
  },
};
