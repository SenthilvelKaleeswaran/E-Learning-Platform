import React from "react";
import { Accordion, AccordionItem, Button } from "@/lib/components/ui";
import { DeleteButton, EditButton, RenderSpace } from "@/lib/components/shared";
import TopicsCard from "./TopicsCard";

export default function ChaptersList({
  chapters,
  renderFinalChpterButton,
  newChapter,
  handleEditTopic,
  isTopicDeleting,
  isChapterUpdating,
  deleteTopic,
  deleteChapter,
  handleEditChapter,
  updateChapter,
  isTopicUpdating
}: any) {
  const renderChapterButton = ({ chapter, index }: any) => {
    if (chapter?.id === newChapter?.id)
      return (
        <div className="flex gap-4 items-center">
          <p>On Edit Panel</p>
          {renderFinalChpterButton()}
        </div>
      );
    else {
      return (
        <div className="flex gap-4">
          <RenderSpace condition={!newChapter?.id}> 
          <EditButton
            onClick={(e: any) => {
              e.stopPropagation();

              updateChapter(
                { id: chapter?.id, isCurrent: true },
                { onSuccess: () => handleEditChapter(index) }
              );
            }}
          >
            Edit
          </EditButton>
          </RenderSpace>
         
          <DeleteButton
            disabled={isChapterUpdating}
            onClick={(e: any) => {
              e.stopPropagation();

              deleteChapter(chapter?.id);
            }}
          >
            Delete
          </DeleteButton>
        </div>
      );
    }
  };

  const renderTopicButton = ({ chapter, topicIndex, index, topic }: any) => {
    return (
      <RenderSpace condition={chapter?.id !== newChapter?.id}>
        <div className="space-x-2">
          <EditButton
            onClick={() => handleEditTopic(topicIndex, index, chapter?.id)}
          >
            Edit
          </EditButton>
          <RenderSpace condition={chapter?.topics?.length > 1}>
            <DeleteButton
              onClick={() => deleteTopic(topic?.id)}
              disabled={isTopicDeleting}
            >
              Delete
            </DeleteButton>
          </RenderSpace>
        </div>
      </RenderSpace>
    );
  };
  return (
    <div className="space-y-4">
      <p className="text-2xl font-semibold text-gray-700">Chapters</p>

      <Accordion allowMultiple>
        {chapters?.map((chapter: any, index: any) => (
          <AccordionItem
            key={chapter.id}
            title={chapter.name}
            description={`Chapter - ${index + 1} `}
            className="bg-white border border-gray-300 rounded-md space-y-8 drop-shadow-lg"
            renderProp={renderChapterButton({ chapter, index })}
          >
            <TopicsCard
              topics={chapter?.topics}
              handleDelete={(id: any) => deleteTopic(id)}
              handleEdit={(topicIndex: any) =>
                handleEditTopic(topicIndex, index, chapter?.id)
              }
              deleteDisable={isTopicDeleting || chapter?.topics?.length === 1}
              editDisable={isTopicUpdating}
            />
            {/* <Accordion allowMultiple>
              {chapter?.topics?.map((topic: any, topicIndex: any) => (
                <AccordionItem
                  key={topic.id}
                  title={topic.name}
                  description={`Topic - ${topicIndex + 1} `}
                  className="bg-gray-50 border border-gray-300 rounded-md space-y-4 drop-shadow-lg"
                  renderProp={renderTopicButton({
                    chapter,
                    topicIndex,
                    index,
                    topic,
                  })}
                >
                  <div
                    key={topicIndex}
                    className="bg-gray-100 p-2 rounded-md mt-2 flex justify-between items-center mb-2"
                  >
                    <div>
                      <p className="text-sm font-medium">{topic.name}</p>
                      <p className="text-xs text-gray-600">
                        {topic.description}
                      </p>
                    </div>
                  </div>
                </AccordionItem>
              ))}
            </Accordion> */}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
