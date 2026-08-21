import { useState, useEffect } from "react";
import MemberCard from "../components/MemberCard";
import { fetchMembersFromNotion, NotionMember } from "../utils/notionApi";

const MEMBERS_DATABASE_ID = "239145b63a1f81f690f4e7267863055c";

export default function TeamPage() {
  const [notionMembers, setNotionMembers] = useState<NotionMember[]>([]);
  const [isLoadingMembers, setIsLoadingMembers] = useState(true);

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const fetchedMembers =
          await fetchMembersFromNotion(MEMBERS_DATABASE_ID);
        setNotionMembers(fetchedMembers);
      } catch (error) {
        console.error("Failed to load members from Notion:", error);
      } finally {
        setIsLoadingMembers(false);
      }
    };

    loadMembers();
  }, []);

  const normalizedMembers = notionMembers.map((member) => {
    const role = member.role?.trim() || "Member";
    const isGeneralMember = role.toLowerCase() === "member";

    return {
      name: member.name,
      major: member.major,
      role: isGeneralMember ? "Studio Member" : role,
      coverImage: member.coverImage,
      isGeneralMember,
    };
  });

  const boardMembers = normalizedMembers.filter(
    (member) => !member.isGeneralMember,
  );
  const studioMembers = normalizedMembers.filter(
    (member) => member.isGeneralMember,
  );

  return (
    <section className="py-24 px-8 md:px-16 lg:px-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-24">
          <h2 className="text-3xl font-black text-dfa-ink mb-12 text-center">
            Board
          </h2>
          {isLoadingMembers ? (
            <div className="text-center py-12 text-dfa-ink/60">
              Loading members...
            </div>
          ) : boardMembers.length === 0 ? (
            <div className="text-center py-12 text-dfa-ink/60">
              No board members found
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-12">
              {boardMembers.map((member, i) => (
                <MemberCard key={i} {...member} />
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-3xl font-black text-dfa-ink mb-12 text-center">
            Studio Members
          </h2>
          {isLoadingMembers ? (
            <div className="text-center py-12 text-dfa-ink/60">
              Loading members...
            </div>
          ) : studioMembers.length === 0 ? (
            <div className="text-center py-12 text-dfa-ink/60">
              No members found
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-12">
              {studioMembers.map((member, i) => (
                <MemberCard key={i} {...member} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
