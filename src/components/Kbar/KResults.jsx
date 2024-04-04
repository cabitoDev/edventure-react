import cx from "classnames";
import { KBarResults, useMatches } from "kbar";
import { cloneElement } from "react";
// import { ArrowRight } from "react-feather";


const KResults = () => {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === "string" ? (
          <div className="px-3 pt-4 pb-2 text-sm text-gray-400">{item}</div>
        ) : (
          <div
            className={cx(
              "flex cursor-pointer items-center justify-between rounded-lg px-3 py-3 transition-colors",
              active ? "bg-tertiary" : "bg-transparent"
            )}
          >
            <div className="flex items-center">
              {item.icon && (
                <div className="mr-4">
                  {cloneElement(item.icon, {
                    className: "h-4 w-4",
                  })}
                </div>
              )}
              {item.parent && (
                <>
                  <span className="opacity-60">
                    {
                      item.ancestors.find(
                        ancestor => ancestor.id === item.parent
                      )?.name
                    }
                  </span>
                  <span className="opacity-60">
                    {/* <ArrowRight className="mx-2 h-4 w-4" /> */}
                  </span>
                </>
              )}
              <span className="text-md">{item.name}</span>
            </div>
          </div>
        )
      }
    />
  );
};

export default KResults;
