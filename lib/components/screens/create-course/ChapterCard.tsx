import React from "react";
import { Button, Input, Accordion, AccordionItem } from "@/lib/components/ui";
import { RenderSpace } from "@/lib/components/shared";

export default function ChapterCard({
  newChapter,
  renderFinalChpterButton,
  isChapterCreating,
  setNewChapter,
  handleToggleTopic,
  isChapterUpdating,
  handleCreateChapter
}: any) {
  const renderProp = () => {
    return (
      <div className="flex gap-4 justify-between items-center">
        <div className="flex gap-2">
          {newChapter?.id ? (
            renderFinalChpterButton()
          ) : (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleCreateChapter()
              }}
              disabled={
                (!newChapter?.name?.trim() && newChapter?.name?.length < 3) ||
                isChapterCreating
              }
            >
              Create Chapter
            </Button>
          )}
        </div>
      </div>
    );
  };
  return (
    <Accordion allowMultiple>
      <AccordionItem
        title={"Chapter Details"}
        description={`Details about the chapter `}
        className=" border border-gray-300 rounded-md space-y-4 drop-shadow-lg"
        isActive
        renderProp={renderProp()}
        isHighlight={false}
      >
        <div className=" rounded-md border space-y-4">
          <Input
            id="chapter-name"
            type="text"
            label="Chapter Name"
            value={newChapter?.name}
            onChange={(e) =>
              setNewChapter({ ...newChapter, name: e.target.value })
            }
            placeholder="Enter chapter name"
          />
          <RenderSpace condition={!!newChapter?.id}>
            <Button
              onClick={() => handleToggleTopic(true)}
              disabled={!newChapter?.name?.trim() || isChapterUpdating}
            >
              Add Topic
            </Button>
          </RenderSpace>
        </div>
      </AccordionItem>
    </Accordion>
  );
}
